const Discord = require("discord.js");
const { run } = require("./clear");

module.exports = {
    name: "poll",
    async run(client, message, args) {
        if (message.author.bot || message.channel.type === "dm") return;
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');

        let embedPoll = new Discord.MessageEmbed()
            .setTitle('👍**VOTE** 👎')
            .setDescription(pollDescription)
            .setColor('RANDOM')
            .setFooter(`${message.author.username} created this poll.`)
        let msgEmbed = await pollChannel.send(embedPoll);
        await msgEmbed.react('✅')
        await msgEmbed.react('❌')
    }
}