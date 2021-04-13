const Discord = require('discord.js');
const config = require("../config.json");
module.exports = {
    name: "comment",
    description: "receive comments about bot and code",
    async run(client, message, args) {
        let channel = client.channels.cache.get(config.logcomment);
        if (message.author.bot) return;
        const embed = new Discord.MessageEmbed();
        embed.setFooter(`UserID: ${message.author.id}`)
            .setTimestamp()
            .setDescription(message.content.slice(9))
            .setTitle("**COMMENTS**")
            .setColor("RANDOM");
        channel.send(embed);
    }
}