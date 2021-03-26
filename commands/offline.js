const Discord = require('discord.js');
const { ownerID } = require("../config.json");
module.exports = {
    name: "offline",
    description: "Set bot status to offline",

    async run(client, message, args) {
        if (message.author.id != ownerID) return;
        client.user.setPresence({
            status: 'invisible',
        });
        message.delete();
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`**Offline**`)
            .setDescription(`Bye, have a good time`)
            .setTimestamp()
            .setColor(`#3d3d3d`);
        message.channel.send(embed).then((sent) => {
            setTimeout(function () {
                sent.delete();
            }, 5000);
        });
    }
}
