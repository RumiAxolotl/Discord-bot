const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const googleTTS = require('google-tts-api'); // You'll need to install this package

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

            // Join the voice channel
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            // Create audio player and resource
            const player = createAudioPlayer();
            const resource = createAudioResource(audioUrl);

            // Play the audio
            connection.subscribe(player);
            player.play(resource);


        } catch (error) {
            console.error(error);
            await message.reply('There was an error playing the text-to-speech!');
        }
    }
};