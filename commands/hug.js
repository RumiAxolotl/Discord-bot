const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: "hug",
    description: "Hug someone",

    async run(client, message, args) {
        message.delete();
        const user = message.mentions.users.first();
        if (!user)
            return message.channel.send("You must mention someone to give hug!")
        if (message.author === user) {
            return await message.channel.send("You cant hug yourself!")
        }
        const res = await axios.get(`https://nekos.life/api/v2/img/hug`);
        const embed = new Discord.MessageEmbed()
            .setTitle(user.username + " Just got a hug from " + message.author.username)
            .setImage(res.data.url)
            .setColor("RANDOM")
            .setDescription((user.toString() + " got a hug from " + message.author.toString()))
            .setFooter({
                text: `this is so cute`
            })
            .setURL(res.data.url);
        message.channel.send({embeds: [embed]});
    }
}