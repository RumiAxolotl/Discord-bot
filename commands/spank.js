const Discord = require('discord.js');
const superagent = require('superagent');
module.exports = {
    name: "spank",
    description: "spank someone",

    async run(client, message, args) {
        message.delete();
        const user = message.mentions.users.first();
        if (!user)
            return message.channel.send({
                embed: {
                    color: 16734039,
                    description: "You must mention someone to spank!"
                }
            })
        if (message.author === user) {
            return await message.channel.send({
                embed: {
                    color: 16734039,
                    description: "You cant spank yourself!"
                }
            })
        }
        superagent.get('https://nekos.life/api/v2/img/spank')
            .end((err, response) => {
                const embed = new Discord.MessageEmbed()
                    .setTitle(user.username + " Just got spank by " + message.author.username)
                    .setImage(response.body.url)
                    .setColor("RANDOM")
                    .setDescription((user.toString() + " got spank by " + message.author.toString()))
                    .setFooter(`bruh`)
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