const Discord = require('discord.js');
module.exports = {
    name: "idle",
    description: "Set bot status to online",

    async run(client, message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR"))
            return message.channel.send(
                `You don't have enough powah to use this command, ${message.author.username}`)
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
