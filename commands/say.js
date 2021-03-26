const { MessageFlags, MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    desciption: "say command",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don\'t have enoug powah to run this command");
        let textChannel = message.mentions.channels.first()
        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            const embed = new MessageEmbed().setFooter(`~~A Duck Apears And Says~~`).setColor('#07DEFF').setDescription(`${msg}`).setTimestamp();
            textChannel.send(embed);
        } else {
            msg = args.join(" ");
            const embed = new MessageEmbed().setFooter(`~~A Duck Apears And Says~~`).setColor('#07DEFF').setDescription(`${msg}`).setTimestamp();
            message.channel.send(embed)
        }
    }
}