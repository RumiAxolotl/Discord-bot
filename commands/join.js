const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: "join",
    description: "Join a voice channel",

    async run(client, message, ) {
        if (!message.member.voice.channel) {
            return message.reply('You need to be in a voice channel first!');
        }

        try {
            joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
        } catch (error) {
            console.error(error);
         message.reply('There was an error joining the voice channel!');
        }
    }
};