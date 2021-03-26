const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    async run (client, message, args) {
    if(message.channel.type === 'dm') return;
        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({size: 1024})


        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.username}'s avatar`)
        .setURL(avatar)
        .setImage(avatar)
        .setColor("RANDOM")
        .setTimestamp()

        message.channel.send(embed);
    }
}