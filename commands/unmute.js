const Discord = require('discord.js');
module.exports = {
    name: "unmute",
    description: "Unmute a member from your server",

    async run(client, message, args) {
        if(message.channel.type === 'dm') return;
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have enough powah to run this command");

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let role = message.guild.roles.cache.find(x => x.name === "Muted");

        if(user.roles.cache.has(role)) return message.channel.send("This member isn't muted");

        user.roles.remove(role);

        const Unmutembed = new Discord.MessageEmbed()
        .setTitle('Member Unmuted')
        .setColor('#00f504')
        .setDescription(`${user} has been unmuted!`)  
        .setFooter('Time unmuted ')
        .setTimestamp()

        message.channel.send(Unmutembed);
    }
}