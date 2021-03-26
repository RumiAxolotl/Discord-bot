const Discord = require('discord.js');
const superagent = require('superagent');
module.exports = {
    name: "poke",
    description: "Poke someone",

    async run(client, message, args) {
        module.exports.run = async (client, message, args) => {
            const user = message.mentions.users.first();
            if (!user)
                return message.channel.send({
                    embed: {
                        color: 16734039,
                        description: "You must mention someone to poke!"
                    }
                })

            if (message.author === user) {
                return await message.channel.send({
                    embed: {
                        color: 16734039,
                        description: "You cant poke yourself!"
                    }
                })
            }
            superagent.get('https://nekos.life/api/v2/img/poke')
                .end((err, response) => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(user.username + " just got poked by " + message.author.username)
                        .setImage(response.body.url)
                        .setColor("RANDOM")
                        .setDescription((user.toString() + " got poked by " + message.author.toString()))
                        .setFooter(`rip`)
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