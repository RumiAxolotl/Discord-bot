const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: "cat",

    async run(client, message, args) {
        message.delete();
        const res = await axios.get(`https://nekos.life/api/v2/img/meow`)
        const embed = new Discord.MessageEmbed()
            .setTitle("Random cat")
            .setImage(res.data.url)
            .setColor(`RANDOM`)
            .setFooter(`meow~~`)
            .setURL(res.data.url);
        message.channel.send({ embeds: [embed] });
    }
}