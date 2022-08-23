const Discord = require("discord.js");

module.exports = {
    name: "servercount",
    desciption: "count the number of channels",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (message.author.bot) return;
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription("I'm in " + `${client.guilds.cache.size}` + " servers!")
            .setTimestamp()
            .setFooter({
                text: message.author.username,
                iconURL: message.author.avatarURL
            });
        message.channel.send({
            embeds: [embed]
        });
        console.log(`${message.author.username}#${message.author.discriminator} used Servercount command`)
    }
}