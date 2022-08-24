const Discord = require('discord.js');
const {
    ownerID
} = require("../config.json");

module.exports = {
    name: "ban",
    description: "Bans a member from the server",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (!message.member.permissionsIn(message.channel).has("BAN_MEMBERS") && message.author.id != ownerID) return message.channel.send("You don't have enough powah  use this command")
        if (!message.guild.me.permissionsIn(message.channel).has("BAN_MEMBERS")) return message.channel.send('I don\'t have the right permissions, Quack!')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send('Please specify a user');

        if (!member) return message.channel.send('Can\'t  find this duck. Quack');
        if (!member.bannable) return message.channel.send('This duck can\'t be banned. They\'re too powahfool, Quack! ');

        if (member.id === message.author.id) return message.channel.send('Quack Quack, you can\'t ban yourself!');

        let banReason = args.slice(1).join(" ");

        if (!banReason) banReason = 'Unspecified';

        member.ban({
                reason: banReason
            })
            .catch(err => {
                if (err) return message.channel.send('Something went wrong')
            });

        const banembed = new Discord.MessageEmbed()
            .setTitle('Member Banned')
            .setThumbnail(member.user.displayAvatarURL())
            .addFields({
                name: 'User Banned',
                value: `${member}`,
                inline: true
            }, {
                name: 'Banned by',
                value: `${message.author}`,
                inline: true
            }, {
                name: 'Reason',
                value: `${banReason}`,
                inline: true
            })
            .setFooter({
                text: 'Time banned',
                iconURL: `${client.user.displayAvatarURL()}`
            })
            .setTimestamp()

        message.channel.send({
            embeds: [banembed]
        });
    }
}