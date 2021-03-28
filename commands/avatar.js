const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    async run (client, message, args) {
    const embed = new Discord.MessageEmbed()
    if(message.channel.type === 'dm') return;
        if (!message.mentions.users.size) {
            embed.setTitle(`${message.author.username}'s avatar`)
                .setURL(message.author.displayAvatarURL)
                .setImage(message.author.displayAvatarURL)
                .setColor("RANDOM")
                .setTimestamp();
        }

        const avatarList = message.mentions.users.map(user => {
            embed.setTitle(`${user.username}'s avatar`)
                .setURL(user.displayAvatarURL)
                .setImage(user.displayAvatarURL)
                .setColor("RANDOM")
                .setTimestamp();
        });
        message.channel.send(embed);
    }
}