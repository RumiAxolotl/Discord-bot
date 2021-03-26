const Discord = require('discord.js');
const { ownerID } = require("../config.json");
module.exports = {
    name: "idle",
    description: "Set bot status to online",

    async run(client, message, args) {
        if (message.member.userID != ownerID) return;
        client.user.setPresence({
            status: 'idle',
        });
        message.delete();
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`**Idle**`)
            .setDescription(`I don't have anything to do`)
            .setTimestamp()
            .setColor(`#fffb00`);
        message.channel.send(embed).then((sent) => {
            setTimeout(function () {
                sent.delete();
            }, 5000);
        });
    }
}
