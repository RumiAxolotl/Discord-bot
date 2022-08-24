const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: "foxgirl",
    description: "send foxgirl",

    async run(client, message, args) {
        message.delete();
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send({
                embed: {
                    color: 16734039,
                    description: "You just can use this command in an NSFW Channel!"
                }
            })
        }
        const res = await axios.get(`https://nekos.life/api/v2/img/fox_girl`);
        const embed = new Discord.MessageEmbed()
            .setTitle(":smirk: Fox girl")
            .setImage(res.data.url)
            .setColor("RANDOM")
            .setFooter({
                text: `Tags: foxgirl `
            })
            .setURL(res.data.url);
        message.channel.send({
            embeds: [embed]
        });
    }
}