const Discord = require('discord.js');

module.exports = {
    name: "invite",
    description: "Get the link to invite Ducky bot",

    async run(client, message, args) {
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`**Invite**`)
            .setColor(`#fcd303`)
            .setDescription(`You can invite me with the link:\nhttps://discord.com/api/oauth2/authorize?client_id=750718927985967144&permissions=8&scope=bot`)
            .setTimestamp()
            .setThumbnail(`https://cdn.discordapp.com/icons/754326147566796811/148897d1d39622e4639cafa03b3d123a.png?size=4096`);
        message.channel.send(embed);
    }
}