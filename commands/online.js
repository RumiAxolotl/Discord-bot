const Discord = require('discord.js');
module.exports = {
    name: "online",
    description: "Set bot status to online",

    async run(client, message, args) {
        if (message.author.userID != `443728905908649985`)
            return message.channel.send(
                `You don't have enough powah to use this command, ${message.author.username}`)
        client.user.setPresence({
                    status: 'online',
                });
        message.delete();
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`**Online**`)
            .setDescription(`I am ready!`)
            .setTimestamp()
            .setColor(`#00ff7b`);
        message.channel.send(embed).then((sent) => {
            setTimeout(function () {
                sent.delete();
            }, 5000);
        });
    }
}
