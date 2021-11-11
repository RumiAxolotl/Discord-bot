const Discord = require('discord.js');
const { ownerID } = require("../config.json");
module.exports = {
    name: "unmute",
    description: "Unmute a member from your server",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (!message.member.permissionsIn(message.channel).has("MANAGE_ROLES") && message.author.id != ownerID) return message.channel.send("You don't have enough powah to run this command");

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "muted");

        if (user.roles.cache.has(role)) return message.channel.send("This member isn't muted");

        user.roles.remove(role);

        const Unmutembed = new Discord.MessageEmbed()
            .setTitle('Member Unmuted')
            .setColor('#00f504')
            .setDescription(`${user} has been unmuted!`)
            .setFooter('Time unmuted ')
            .setTimestamp()

        message.channel.send({ embeds: [Unmutembed] });
        console.log(`${message.author.username}#${message.author.discriminator} used Unmute command`)
    }
}