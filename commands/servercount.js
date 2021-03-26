const Discord = require("discord.js");

module.exports = {
    name: "servercount",
    desciption: "count the number of channels",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (message.author.bot) return;
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription("I'm in " + `${client.guilds.size}` + " servers!")
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL);
        message.channel.send(embed);
        console.log('Someone Executed The Check Server Size Command(s)')
    }
}