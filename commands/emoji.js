const Discord = require('discord.js');
const { parse } = require('twemoji-parser');
module.exports = {
    name: "emoji",
    description: "get emoji from the server",

    async run(client, message, args) {
        const emoji = args[0];
        if (!emoji) return message.channel.send({
            embed: {
                color: 16734039,
                description: "Please insert an emoji, quack!"
            }
        });
        let custom = Discord.Util.parseEmoji(emoji);
        const embed = new Discord.MessageEmbed()
            .setTitle(`Your emoji : ${emoji}`)
            .setColor("RANDOM");
        
        if (custom.id) {
            let link = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`
            embed.setImage(link)
                .setFooter(`Emoji ID: ${custom.id}`);
            return message.channel.send(embed);
        }
        else {
            let parsed = parse(emoji, { assetType: `png` });
            if (!parsed[0]) return message.channel.send("Can't find Emoji!")
            embed.setImage(parsed[0].url);
            return message.channel.send(embed);

        }

    }
}