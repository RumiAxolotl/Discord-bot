const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "sleep",
    description: "help you have a better sleep",

    async run(client, message, args) {
        message.delete();

        const sleepCycle = 1.5 * 60 * 60 * 1000; // 1.5 hours in milliseconds
        const sleepTime = new Date().getTime() + sleepCycle + (15 * 60 * 1000); // Add 15 minutes for falling asleep

        const embed = new MessageEmbed()
            .setColor('#b4befe')
            .setTitle(`It's currently ${new Date().toLocaleTimeString()}. If you sleep now, you should wake up at:`);

        // Use a loop to create the fields dynamically
        for (let i = 1; i <= 6; i++) {
            const wakeUpTime = new Date(sleepTime + sleepCycle * (i - 1));
            embed.addFields({
                name: `⏰ ${wakeUpTime.toLocaleTimeString()}`,
                value: `for ${i * 1.5} hours sleep cycle.`,
                inline: true
            });
        }
        embed.setDescription(
            `Notice: You should wake up at those times to feel fresh and not tired. People usually take ~15 minutes to fall asleep, so you should have a good plan.\n\nGOODNIGHT! 🌙`
        )
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
}