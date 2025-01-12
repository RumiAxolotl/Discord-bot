module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        // Ignore messages from bots
        if (message.author.bot) return;

    if (message.content.startsWith('wlc')) {
        const welcomeCommand = client.commands.get('welcome');
        if (welcomeCommand) {
            welcomeCommand.run(client, message, message.content.split(' ').slice(1));
        }
        }
        if (message.member.voice.channel && client.voice.adapters.get(message.guild.id) && message.channel.id == message.guild.me.voice.channelId && !message.content.startsWith(`${process.env.PREFIX}` && !message.content.startsWith('<:' ))) {
            const speakCommand = client.commands.get('speak');
            if (speakCommand) {
                speakCommand.run(client, message, [message.content]);
            }
        }
    }

}