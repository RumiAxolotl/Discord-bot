const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    async run(client, message, args) {
        if (message.channel.type === "dm") return;
        let member = message.mentions.users.first() || message.author;

        let avatar = member.displayAvatarURL({ dynamic: true, size: 4096 });

        const embed = new Discord.MessageEmbed()
            .setTitle(`${member.username}'s avatar`)
            .setURL(avatar)
            .setImage(avatar)
            .setColor("#b4befe")
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
