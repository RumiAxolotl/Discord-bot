
const Discord = require("discord.js");

module.exports = {
    name: "channelcount",
    desciption: "count the number of channels",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        if (message.author.bot) return;
        message.channel.send('I am Active in ' + '**`' + ` ${client.channels.cache.size} ` + '`**' + ' Channels');
        console.log('Someone Executed The Check Channel Size Command(s)')
    }
}
