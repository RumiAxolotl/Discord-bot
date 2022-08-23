const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "dm",
    desciption: "dm command",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')) return message.channel.send("You don\'t have enough powah to run this command");
        let members = message.mentions.members.first();
        message.delete()

        if (members) {
            msg = args.slice(2).join(" ");
            const embed = new MessageEmbed()
                .setColor('#fcd303')
                .addField(`**A Duck Apear And Say**`, `${msg}`, true)
                .setTimestamp();
            members.send({
                embeds: [embed]
            });
        } else {
            message.channel.send("You must mention someone"
            )
        }
    }
}