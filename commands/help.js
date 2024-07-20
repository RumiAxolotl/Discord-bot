const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Show all commands and their descriptions',
    async run(client, message, args) {
        // Create an embed to display the commands
        const embed = new MessageEmbed()
            .setColor('#b4befe')
            .setTitle('Commands List')
            .setDescription('Here is a list of all available commands:')

        const commands = client.commands.map(command => {
            return {
                command: command.name,
                description: command.description
            }
        });
        for (const cmd of commands) {
            embed.addFields({
                name: `**${cmd.command}**`,
                value: `${cmd.description}`,
                inline: true
            });
        }
        message.channel.send({ embeds: [embed] });
    },
};