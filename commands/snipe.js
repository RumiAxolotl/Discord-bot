const Discord = require('discord.js')

module.exports.run = async (client, message) => {
    const msg = client.snipes.get(message.channel.id)
    const embed = new Discord.MessageEmbed()
        .setAuthor(msg.author, msg.member.user.displayAvatarURL())
        .setDescription(msg.content)
        .setFooter('Get Sniped lol')
        .setTimestamp();
    message.channel.send(embed);
}
module.exports = {
    name: "resetcfs",
    description: "reset cfs count to 0",
}