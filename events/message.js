module.exports = {
    name: 'message',
    once: true,
    execute(message) {
        if (message.content.includes(Axo)) return message.channel.send("Ông trùm Coder, Thiên tài tin học, Hacker bẩm sinh, Vua của bot")
    }
}