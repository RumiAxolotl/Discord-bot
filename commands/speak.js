const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const googleTTS = require('google-tts-api');
const ffmpeg = require('ffmpeg-static');
const { exec } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Add queue management
const queues = new Map();

module.exports = {
    name: "speak",
    description: "Make the bot speak text in voice channel",
    
    async run(client, message, args) {
        
        //filter out the bot
        if (message.author.bot) return;

        //filter out the emoji discord 
        if (message.content.startsWith('<')) return;


        
        let text = args.join(" ");
        if (!text) {
            return message.reply('Please provide some text to speak!');
        }

        // Add member name to the text if different from last speaker
        if (!global.lastSpeaker || global.lastSpeaker !== message.member.displayName) {
            text = `${message.member.displayName} says ${text}`;
        }
        global.lastSpeaker = message.member.displayName;

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel!');
        }

        // Initialize queue for this guild if it doesn't exist
        if (!queues.has(message.guild.id)) {
            queues.set(message.guild.id, {
                messages: [],
                playing: false
            });
        }

        const queue = queues.get(message.guild.id);
        queue.messages.push({ text, voiceChannel, message });

        // If not playing, start the queue
        if (!queue.playing) {
            processQueue(message.guild.id);
        }
    }
};

async function processQueue(guildId) {
    const queue = queues.get(guildId);
    if (!queue || queue.messages.length === 0) {
        queue.playing = false;
        return;
    }

    queue.playing = true;
    const { text, voiceChannel, message } = queue.messages.shift();

    try {
        const audioUrl = await googleTTS.getAudioUrl(text, {
            lang: 'vi',
            slow: false,
            host: 'https://translate.google.com',
        });

        const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
        const tempFile = path.join(__dirname, '../temp', `${Date.now()}.mp3`);
        const outputFile = path.join(__dirname, '../temp', `${Date.now()}_output.mp3`);

        if (!fs.existsSync(path.join(__dirname, '../temp'))) {
            fs.mkdirSync(path.join(__dirname, '../temp'));
        }

        fs.writeFileSync(tempFile, response.data);

        await new Promise((resolve, reject) => {
            exec(`${ffmpeg} -i ${tempFile} -af "volume=1.0" -c:a libmp3lame ${outputFile}`, (error) => {
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
            fs.unlinkSync(tempFile);
            fs.unlinkSync(outputFile);
            // Process next item in queue
            processQueue(guildId);
        });

        player.on('error', error => {
            console.error(error);
            connection.destroy();
            if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
            if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
            message.channel.send('An error occurred while playing the audio!');
            processQueue(guildId);
        });

        connection.subscribe(player);
        player.play(resource);


    } catch (error) {
        console.error(error);
        message.reply('There was an error playing the text-to-speech!');
        processQueue(guildId);
    }
}