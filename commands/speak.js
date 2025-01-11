const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const googleTTS = require('google-tts-api'); // You'll need to install this package
const ffmpeg = require('fluent-ffmpeg'); // You'll need to install this package
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const fetch = require('node-fetch'); // You'll need to install this package

const pipelineAsync = promisify(pipeline);

module.exports = {
    name: "speak", // Changed from "leave" to "speak"
    description: "Make the bot speak text in voice channel",
    
    async run(client, message, args) {
        // Get the text to speak from arguments
        const text = args.join(" ");
        if (!text) {
            return message.reply('Please provide some text to speak!');
        }

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel!');
        }

        try {
            // Get the audio URL from Google TTS
            const audioUrl = await googleTTS.getAudioUrl(text, {
                lang: 'vi',
                slow: false,
                host: 'https://translate.google.com',
            });

            // Download the audio file
            const response = await fetch(audioUrl);
            if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

            const audioPath = './audio.mp3';
            await pipelineAsync(response.body, fs.createWriteStream(audioPath));

            // Convert the audio file to a format that can be played by the Discord bot
            const outputPath = './audio.ogg';
            await new Promise((resolve, reject) => {
                ffmpeg(audioPath)
                    .toFormat('ogg')
                    .on('end', resolve)
                    .on('error', reject)
                    .save(outputPath);
            });

            // Join the voice channel
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            // Create audio player and resource
            const player = createAudioPlayer();
            const resource = createAudioResource(outputPath);

            // Play the audio
            connection.subscribe(player);
            player.play(resource);

            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy();
                fs.unlinkSync(audioPath);
                fs.unlinkSync(outputPath);
            });

        } catch (error) {
            console.error(error);
            await message.reply('There was an error playing the text-to-speech!');
        }
    }
};