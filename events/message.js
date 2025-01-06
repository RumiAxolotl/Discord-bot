module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        // Ignore messages from bots
        if (message.author.bot) return;

    if (message.content.toLowerCase() === 'wlc') {
        const welcomeCommand = client.commands.get('welcome');
        if (welcomeCommand) {
            welcomeCommand.run(client, message, []);
        }
    }
    }
}