const Discord = require('discord.js');
const { ownerID } = require("../config.json");
module.exports = {
    name: "nitro",
    description: "Free nitro gift!",
    async run(message) {
        message.channel.send("https://dis.cord.gifts/4XYL5zBJq5j299al");
    }
}
