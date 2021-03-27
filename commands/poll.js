const Discord = require("discord.js");

module.exports = {
    name: "poll",
    description: "vote for something",

    async run(client, message, args) {
        message.delete();

        const pollmessage = await args.join(" ");

        if (pollmessage.length <= 0) return message.channel.send({
            embed: {
                color: 16734039,
                description: "You must provide a text to ask a question!"
            }
        })
        const embed = new Discord.MessageEmbed()
            .setTitle(":ballot_box: " + `${message.author.username}` + " has created a poll! React with the emojis to vote! :ballot_box:",)
            .setColor("RANDOM")
            .addField("Poll", pollmessage,)
            .setFooter("Note: The voting will be ended in 1 minute ! ")
            .setTimestamp();
        const pollTopic = await message.channel.send({ embed })
        await pollTopic.react(`✅`);
        await pollTopic.react(`❌`);
    }
}