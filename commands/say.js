const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    description: "say command",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')) {
            return message.channel.send("You don't have enough power to run this command");
        }

        const textChannel = message.mentions.channels.first();
        const msg = textChannel ? args.slice(1).join(" ") : args.join(" ");
        
        if (!msg) {
            return message.channel.send("Please provide a message to send.");
        }

        const embed = new MessageEmbed()
            .setColor('#b4befe')
            .addFields({
                name: `**Message**`,
                value: msg,
                inline: true
            })
            .setTimestamp();

        try {
            if (textChannel) {
                await textChannel.send({ embeds: [embed] });
            } else {
                await message.channel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    }
}