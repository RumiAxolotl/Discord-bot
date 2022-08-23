const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: "dog",

    async run(client, message, args) {
        message.delete();
        const res = await axios.get('https://nekos.life/api/v2/img/woof')
        const embed = new Discord.MessageEmbed()
            .setTitle("Random dog")
            .setImage(res.data.url)
            .setColor("RANDOM")
            .setFooter({
                text: `woof!!`
            })
            .setURL(res.data.url);
        message.channel.send({
            embeds: [embed]
        });
    }
}