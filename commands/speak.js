const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const googleTTS = require('google-tts-api');
const ffmpeg = require('ffmpeg-static');
const { exec } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: "speak",
    description: "Make the bot speak text in voice channel",
    
    async run(client, message, args) {
        const text = args.join(" ");
        if (!text) {
            return message.reply('Please provide some text to speak!');
        }


        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel!');
        }

        try {
            const audioUrl = await googleTTS.getAudioUrl(text, {
                lang: 'vi',
                slow: false,
                host: 'https://translate.google.com',
            });

            // Download audio file
            const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
            const tempFile = path.join(__dirname, '../temp', `${Date.now()}.mp3`);
            const outputFile = path.join(__dirname, '../temp', `${Date.now()}_output.mp3`);

            // Ensure temp directory exists
            if (!fs.existsSync(path.join(__dirname, '../temp'))) {
                fs.mkdirSync(path.join(__dirname, '../temp'));
            }

            // Save downloaded audio
            fs.writeFileSync(tempFile, response.data);

            // Process with FFmpeg
            await new Promise((resolve, reject) => {
                exec(`${ffmpeg} -i ${tempFile} -af "volume=2.0" -c:a libmp3lame ${outputFile}`, (error) => {
                    if (error) reject(error);
                    else resolve();
                });
            });

            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            const player = createAudioPlayer();
            const resource = createAudioResource(outputFile);

            player.on(AudioPlayerStatus.Idle, () => {
                // Clean up temp files
                fs.unlinkSync(tempFile);
                fs.unlinkSync(outputFile);
            });

            player.on('error', error => {
                console.error(error);
                connection.destroy();
                // Clean up temp files
                if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
                if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
                message.channel.send('An error occurred while playing the audio!');
            });

            connection.subscribe(player);
            player.play(resource);

        } catch (error) {
            console.error(error);
            await message.reply('There was an error playing the text-to-speech!');
        }
    }
};