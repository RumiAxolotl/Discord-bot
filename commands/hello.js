module.exports = {
    name: "hello",
    description: "hello command",

    async run(client, message, args) {
        message.channel.send("Hello!");
    }
}