const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    desciption: "say command",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')) return message.channel.send("You don\'t have enough powah to run this command");
        let textChannel = message.mentions.channels.first()
        message.delete()

        if (textChannel) {
            msg = args.slice(1).join(" ");
            const embed = new MessageEmbed()
                .setColor('#b4befe')
                .addFields({
                    name: `**An Axolotl Apear And Say**`,
                    value: `${msg}`,
                    inline: true
                })
                .setTimestamp();
            textChannel.send({ embeds: [embed] });
        } else {
            msg = args.join(" ");
            const embed = new MessageEmbed()
                .setColor('#b4befe')
                .addFields({
                    name: `**An Axolotl Appears And Say**`,
                    value: `${msg}`,
                    inline: true
                })
                .setTimestamp();
            message.channel.send({ embeds: [embed] })
        }
    }
}