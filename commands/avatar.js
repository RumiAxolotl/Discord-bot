const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    async run(client, message, args) {
        if (message.channel.type === "dm") return;

        let member = message.mentions.users.first();
        if (!member && args[0]) {
            const userId = args[0].replaceAll(/[<@!>]/g, "");
            if (/^\d+$/.test(userId)) {
                try {
                    member = await client.users.fetch(userId);
                } catch {
                    return message.channel.send("I couldn't find a user with that ID.");
                }
            } else {
                return message.channel.send("Please provide a valid user ID or mention a user.");
            }
        }

        if (!member) {
            member = message.author;
        }

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
