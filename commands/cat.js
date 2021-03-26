const Discord = require('discord.js');
const superagent = require('superagent');
module.exports = {
    name: "cat",

    async run(client, message, args) {
        message.delete();
        superagent.get('https://nekos.life/api/v2/img/meow')
            .end((err, response) => {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Random cat")
                    .setImage(response.body.url)
                    .setColor(`RANDOM`)
                    .setFooter(`meow`)
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