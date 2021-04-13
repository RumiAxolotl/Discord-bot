const Discord = require('discord.js');
const { ownerID } = require("../config.json");
const { count } = require('../count.json');
const fs = require('fs');
module.exports = {
    name: "resetcfs",
    description: "reset cfs count to 0",
    async run(client, message, args) {
        if (message.author.id != ownerID) return message.channel.send("You don't have enough powah  use this command");
        let count = JSON.parse(fs.readFileSync('./count.json')).count;
        count = 0;
        message.channel.send(`**Reset Confession to** \`0\`!`);
    }
}