module.exports = {
    name: 'MessageDelete',
    once: true,
    execute(client, message) {
        if (message.author.bot) return;
        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author.username,
            member: message.member,
            image: message.attachments.first() ? message.attachments.first().proxyURL : null
        })
    }
}