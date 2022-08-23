const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: "pat",
    description: "pat someone",

    async run(client, message, args) {
        message.delete();
        const user = message.mentions.users.first();
        if (!user)
            return message.channel.send("You must mention someone to pat!");

        if (message.author === user)
            return await message.channel.send("You cant pat yourself!")
        
        const res = await axios.get('https://nekos.life/api/v2/img/pat')
        const embed = new Discord.MessageEmbed()
            .setTitle(user.username + " Just got a pat from " + message.author.username)
            .setImage(res.data.url)
            .setColor("RANDOM")
            .setDescription((user.toString() + " got a pat from " + message.author.toString()))
            .setFooter({
                text: `this is so cute`
            })
            .setURL(res.data.url);
        message.channel.send({embeds: [embed]});
    }
}