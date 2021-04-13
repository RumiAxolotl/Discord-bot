const Discord = require('discord.js');
const {ownerID} = require ("../config.json");

module.exports = {
    name: "ban",
    description: "Bans a member from the server",

    async run (client, message, args) {
    if(message.channel.type === 'dm') return;
        if (!message.member.hasPermission("BAN_MEMBERS") || message.author.id != ownerID) return message.channel.send('You can\'t use that, Quack!')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I don\'t have the right permissions, Quack!')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Please specify a user');

        if(!member) return message.channel.send('Can\'t  find this duck. Quack');
        if(!member.bannable) return message.channel.send('This duck can\'t be banned. They\'re too powahfool, Quack! ');

        if(member.id === message.author.id) return message.channel.send('Quack Quack, you can\'t ban yourself!');

        let banReason = args.slice(1).join(" ");

        if(!banReason) banReason = 'Unspecified';

        member.ban({ reason: banReason })
            .catch(err => {
                if (err) return message.channel.send('Something went wrong')
            });

        const banembed = new Discord.MessageEmbed()
        .setTitle('Member Banned')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Banned', member, true)
        .addField('Banned by', message.author, true)
        .addField('Reason', banReason, true)
        .setFooter('Time banned', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(banembed);


    }
}