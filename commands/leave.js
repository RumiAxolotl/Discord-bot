const { joinVoiceChannel } = require("@discordjs/voice");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
    name: "leave",
    description: "Leave the voice channel",

    async run(client, message) {
        const connection = getVoiceConnection(message.guild.id);
        
        if (!connection) {
            return message.reply('I am not in a voice channel!');
        }

        try {
            connection.destroy();
        } catch (error) {
            console.error(error);
            message.reply('There was an error leaving the voice channel!');
        }
    }
};