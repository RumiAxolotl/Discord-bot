const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
    name: "slap",
    description: "Hug someone",

    async run(client, message, args) {
        message.delete();
        const user = message.mentions.users.first();
        if (!user)
            return message.channel.send("You must mention someone to slap!")
        if (message.author === user) {
            return await message.channel.send("You cant slap yourself!")
        }
        const res = await axios.get(`https://nekos.life/api/v2/img/slap`);
        const embed = new Discord.MessageEmbed()
            .setTitle(user.username + " just got slapped by " + message.author.username)
            .setImage(res.data.url)
            .setColor("RANDOM")
            .setDescription((user.toString() + " got slapped by " + message.author.toString()))
            .setFooter({                    
                text: `That must hurt ._.`
            })
            .setURL(res.data.url);
        message.channel.send({ embeds: [embed] });
    }
}