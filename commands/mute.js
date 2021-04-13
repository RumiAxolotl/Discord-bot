const Discord = require('discord.js');
const { ownerID } = require("../config.json");
module.exports = {
    name: "mute",
    description: "Mute a member from your server",

    async run(client, message, args) {
        if(message.channel.type === 'dm') return;
        if (!message.member.hasPermission("MANAGE_ROLES") && message.author.id != ownerID) return message.channel.send("You don\'t have enoug powah to run this command");

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!user) message.channel.send("This ducky can't be found anywhere in this server");

        if(user.id === message.author.id) return message.channel.send("You cannot mute yourself, stupid duck");

        let role = message.guild.roles.cache.find(x => x.name === "Muted");

        if(!role) return message.channel.send("Cannot find the muted role, quack!");

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "Unspecified"

        user.roles.add(role)

        user.send(`Hello there. You have been muted from ${message.guild.name} for the following reason: ${reason}`);
        const mutembed = new Discord.MessageEmbed()
        .setTitle('Member Muted')
        .setColor('#f5f500')
        .addField('User Muted', user)
        .addField('Reason', reason)
        .addField('Muted by', message.author)
        .addField('Reason', reason)
        .setFooter('Time muted: ')
        .setTimestamp()

        await message.channel.send(mutembed);
    }
}