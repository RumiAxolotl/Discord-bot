const Discord = require('discord.js');
const ownerID = process.env.DEVID;
module.exports = {
    name: "mute",
    description: "Mute a member from your server",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (!message.member.permissionsIn(message.channel).has("MANAGE_ROLES") && message.author.id != ownerID) return message.channel.send("You don\'t have enoug powah to run this command");

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!user) message.channel.send("This ducky can't be found anywhere in this server");

        if (user.id === message.author.id) return message.channel.send("You cannot mute yourself, stupid duck");

        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "muted");

        if (!role) return message.channel.send("Cannot find the muted role, quack!");

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Unspecified"

        user.roles.add(role);
        const mutembed = new Discord.MessageEmbed()
            .setTitle('Member Muted')
            .setColor('#b4befe')
            .addFields({
                name: 'User Muted',
                value: `${user}`
            }, {
                name: 'Reason',
                value: `${reason}`
            }, {
                name: 'Muted by',
                value: `${message.author}`
            },

            )
            .setFooter({
                text: 'Time muted ',
                iconURL: `${client.user.displayAvatarURL()}`
            })
            .setTimestamp()

        await message.channel.send({
            embeds: [mutembed]
        });
        console.log(`${message.author.username}#${message.author.discriminator} used Mute command`)
    }
}