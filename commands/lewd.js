const Discord = require('discord.js');
const superagent = require('superagent');
module.exports = {
    name: "nsfw",
    description: "get lewd image",

    async run(client, message, args) {
        if (!message.channel.NSFW) return message.channel.send('**NSFW Channel only!**')
        message.delete();
        else {
            superagent.get('https://nekos.life/api/v2/img/lewd')
                .end((err, response) => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle('Lewd Image')
                        .setImage(response.body.url)
                        .setColor(`RANDOM`)
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
}