const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "show ping command",

    async run(client, message, args) {


        const ping = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor("07DEFF")
            .setDescription(`📡 ${client.ws.ping} ms`);


        message.channel.send({ embeds: [ping] });
    }
}