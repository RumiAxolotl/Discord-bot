const math = require('mathjs');

const Discord = require('discord.js');

module.exports = {
    name: "calculate",
    description: "Get the answer to a math problem",


    async run(client, message, args) {

        if (!args[0]) return message.channel.send('Please provide a question');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Please provide a **valid** question')
        }

        const embed = new Discord.MessageEmbed()
            .setColor("#07DEFF")
            .setTitle('Calculator')
            .addFields({
                name: 'Question',
                value: `\`${args.join(' ')}\``
            }, {
                name: 'Answer',
                value: `\`${resp}\``
            })

        message.channel.send({
            embeds: [embed]
        });
    }
}