const Discord = require("discord.js");

module.exports = {
    name: "channelcount",
    description: "count the number of channels",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (message.author.bot) return;
        const embed = new Discord.MessageEmbed()
            .setColor("#b4befe")
            .setDescription("I'm in " + `${client.channels.cache.size}` + " channels!")
            .setTimestamp()
            .setFooter({
                text: message.author.username,
                iconURL: message.author.avatarURL
            });
        message.channel.send({ embeds: [embed] });
        console.log(`${message.author.username} used Channelcount command`)
    }
}
