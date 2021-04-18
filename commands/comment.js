const Discord = require('discord.js');
const config = require("../config.json");
module.exports = {
    name: "comment",
    description: "receive comments about bot and code",
    async run(client, message, args) {
        message.delete();
        let channel = client.channels.cache.get(config.logcomment);
        if (message.author.bot) return;
        const embed = new Discord.MessageEmbed();
        embed.setFooter(`Username: ${message.author.username}`)
            .setTimestamp()
            .setDescription(message.content.slice(10))
            .setTitle("**COMMENTS**")
            .setColor("RANDOM");
        channel.send(embed);
        await message.channel.send({
            embed: {
                color: 5767167,
                description: `${message.author} ,you just sent a comment to my master, he will reply you soon!`
            }
        }).then((sent) => {
            setTimeout(function () {
                sent.delete();
            }, 2500);
        });
    }
}