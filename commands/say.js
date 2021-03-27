const { MessageFlags, MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    desciption: "say command",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don\'t have enough powah to run this command");
        let textChannel = message.mentions.channels.first()
        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            const embed = new MessageEmbed().setColor('#fcd303').addField(`**A Duck Apear And Say**`,`${msg}`, true).setTimestamp();
            textChannel.send(embed);
        } else {
            msg = args.join(" ");
            const embed = new MessageEmbed().setColor('#fcd303').addField(`**A Duck Apear And Say**`, `${msg}`, true).setTimestamp();
            message.channel.send(embed)
        }
    }
}