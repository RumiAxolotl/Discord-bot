const Discord = require('discord.js');
module.exports = {
    name: "dnd",
    description: "Set bot status to online",

    async run(client, message, args) {
        if (message.author.userID != `443728905908649985`)
            return message.channel.send(
                `You don't have enough powah to use this command, ${message.author.username}`)
        client.user.setPresence({
            status: 'dnd',
        });
        message.delete();
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`**Do Not Disturb**`)
            .setDescription(`I'm Busy`)
            .setTimestamp()
            .setColor(`#ff0000`);
        message.channel.send(embed).then((sent) => {
            setTimeout(function () {
                sent.delete();
            }, 5000);
        });
    }
}
