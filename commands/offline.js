const Discord = require('discord.js');
module.exports = {
    name: "offline",
    description: "Set bot status to online",

    async run(client, message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR"))
            return message.channel.send(
                `You don't have enough powah to use this command, ${message.author.username}`)
        client.user.setPresence({
            status: 'online',
        });
        message.delete();
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`**Offline**`)
            .setDescription(`I am ready!`)
            .setTimestamp()
            .setColor(`#3d3d3d`);
        message.channel.send(embed).then((sent) => {
            setTimeout(function () {
                sent.delete();
            }, 5000);
        });
    }
}
