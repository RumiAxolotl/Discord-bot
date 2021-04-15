const Discord = require('discord.js');
module.exports = {
    name: "snipe",
    description: "A role utility command",
    async run(client, message, args) {
        const msg = client.snipes.get(message.channel.id)
        if (!msg) return await message.channel.send({
            embed: {
                color: 16734039,
                description: "You cant slap yourself!"
            }
        })
        const embed = new Discord.MessageEmbed()
            .setDescription(msg.content)
            .setFooter('Get Sniped lol')
            .setTimestamp();
        message.channel.send(embed);
    }
}