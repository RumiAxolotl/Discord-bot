const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "sleep",
    desciption: "help you have a better sleep",

    async run(client, message, args) {
        message.delete()
        const sleepCycle = 1.5 * 60 * 60 * 1000 ;
        const sleepTime = new Date().getTime() + sleepCycle + (15 * 60 * 1000);
        const embed = new MessageEmbed()
            .setColor('#b4befe')
            .addFields({
                name: `**It's currently ${new Date().toLocaleTimeString()}, If you sleep now, you should wake up at:**`,
                value: `

                ⏰ ${new Date(sleepTime).toLocaleTimeString()} for 1.5 hours sleep cycle.

                ⏰ ${new Date(sleepTime + sleepCycle).toLocaleTimeString()} for 3 hours sleep cycle.

                ⏰ ${new Date(sleepTime + sleepCycle * 2).toLocaleTimeString()} for 4.5 hours sleep cycle.

                ⏰ ${new Date(sleepTime + sleepCycle * 3).toLocaleTimeString()} for 6 hours sleep cycle.

                ⏰ ${new Date(sleepTime + sleepCycle * 4).toLocaleTimeString()} for 7.5 hours sleep cycle.
                
                ⏰ ${new Date(sleepTime + sleepCycle * 5).toLocaleTimeString()} for 9 hours sleep cycle.

                Notice: You should wake up at those time to feel fresh and not tired. People usually take ~15 minutes to fall asleep, so you should have good plan.

                GOODNIGHT! 🌙

                `,
                inline: true

            })
            .setTimestamp();
        message.channel.send({ embeds: [embed] })
    }
}