const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: "boobs",
    description: "send boobs",

    async run(client, message, args) {
        message.delete();
        const user = message.mentions.users.first();
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
        const res = await axios.get(`https://nekos.life/api/v2/img/boobs`);
        const embed = new Discord.MessageEmbed()
            .setTitle(":smirk: Boobs")
            .setImage(res.data.url)
            .setColor("RANDOM")
            .setFooter({
                text: `Tags: boobs `
            })
            .setURL(res.data.url);
        message.channel.send({
            embeds: [embed]
        });
    }
}