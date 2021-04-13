const Discord = require('discord.js');
const { ownerID } = require("../config.json");
module.exports = {
    name: "comment",
    description: "receive comments about bot and code",
    async run(client, message, args) {
        let owner = message.guild.members.get(ownerID);
        if (message.author.bot) return;
        const embed = new Discord.MessageEmbed();
        embed.setAuthor(`${message.author.id}`)
            .setTimestamp()
            .setDescription(`${message.content}`)
            .setTitle("**COMMENTS**")
            .setColor("RANDOM");
        owner.send(embed);
    }
}