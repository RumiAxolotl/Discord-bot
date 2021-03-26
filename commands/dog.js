const Discord = require('discord.js');
const superagent = require('superagent');
module.exports = {
    name: "dog",

    async run(client, message, args) {
        message.delete();
        superagent.get('https://nekos.life/api/v2/img/woof')
            .end((err, response) => {
                const embed = new Discord.RichEmbed()
                    .setTitle("Random dog")
                    .setImage(response.body.url)
                    .setColor("RANDOM")
                    .setFooter(`woof`)
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