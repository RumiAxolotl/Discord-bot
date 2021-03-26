const Discord = require('discord.js');
const { count } = require('../count.json');
const fs = require('fs');
module.exports = {
    name: "resetcfs",
    description: "reset cfs count to 0",
    async run(client, message, args) {
        let count = JSON.parse(fs.readFileSync('./count.json')).count;
        count = 0;
        message.channel.send(`**Reset Confession to** \`0\`!`);
    }
}