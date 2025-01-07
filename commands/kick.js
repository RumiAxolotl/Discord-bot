const Discord = require('discord.js');
const ownerID = process.env.DEVID;

module.exports = {
    name: "kick",
    description: "Kicks a member from the server",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (!message.member.permissionsIn(message.channel).has("KICK_MEMBERS") || message.author.id != ownerID) return message.channel.send('You can\'t use that!')
        if (!message.guild.me.permissionsIn(message.channel).has("KICK_MEMBERS")) return message.channel.send('I don\'t have the right permissions!')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send('Please specify a user');

        if (!member) return message.channel.send('Can\'t find this user.');
        if (!member.kickable) return message.channel.send('This user can\'t be kicked. They\'re too powerful!');

        if (member.id === message.author.id) return message.channel.send('You can\'t kick yourself!');

        let KickReason = args.slice(1).join(" ");

        if (!KickReason) KickReason = 'Unspecified';

        member.kick({
            reason: KickReason
        })
            .catch(err => {
                if (err) return message.channel.send('Something went wrong')
            });

        const Kickembed = new Discord.MessageEmbed()
            .setTitle('Member Kicked')
            .setColor('#b4befe')
            .setThumbnail(member.user.displayAvatarURL())
            .addFields({
                name: 'User Kicked',
                value: `${member}`,
                inline: true
            }, {
                name: 'Kicked by',
                value: `${message.author}`,
                inline: true
            }, {
                name: 'Reason',
                value: `${KickReason}`,
                inline: true
            })
            .setFooter({
                text: 'Time kicked',
                iconURL: `${client.user.displayAvatarURL()}`
            })
            .setTimestamp()

        message.channel.send({
            embeds: [Kickembed]
        });
    }
}
