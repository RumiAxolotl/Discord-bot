const Discord = require('discord.js');
const superagent = require('superagent');
module.exports = {
    name: "spank",

    async run(client, message, args) {
        message.delete();
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send({
                embed: {
                    color: 16734039,
                    description: "You can use this command in an NSFW Channel!"
                }
            })
        }
        superagent.get('https://nekos.life/api/v2/img/fox_girl')
            .end((err, response) => {
                const embed = new Discord.RichEmbed()
                    .setTitle(":smirk: Fox girl")
                    .setImage(response.body.url)
                    .setColor(`RANDOM`)
                    .setFooter(`Tags: fox girl`)
                    .setURL(response.body.url);
                message.channel.send(embed);
            }).catch((err) => message.channel.send({
                embed: {
                    color: 16734039,
                    description: "Something went wrong... :cry:"
                }
            }));
    }
}