module.exports = {
    name: 'message',
    execute(message) {
        if (message.author.bot) return;
        if (message.content.includes("<@!443728905908649985"))
            return message.reply("Don't mention my master, please send message with `d*comment + <content>` and my master will reply you!");
    }
}