const axios = require('axios');
const Discord = require('discord.js');
module.exports = {
    name: "ai",
    description: "smart bot",

    async run(client, message, args) {
        message.delete();
        try {
            const res = await axios.get(`
            http://api.brainshop.ai/get?bid=155428&key=aE6dItjROvW72dv8&uid=1&msg=${encodeURIComponent(args.join(" "))}`);
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`**AI Ducky**`)
                .setColor("RANDOM")
                .setDescription(res.data.cnt)
                .setThumbnail(`https://cdn.discordapp.com/icons/754326147566796811/148897d1d39622e4639cafa03b3d123a.png?size=4096`)
                .setTimestamp();
            message.channel.send(embed);
        }
        catch(e) {
            message.channel.send({
                embed: {
                    color: 16734039,
                    description: "Bot Is ERROR, Try Again Later!"
                }
            }
            ).then((sent) => {
                setTimeout(function () {
                    sent.delete();
                }, 2500);
            });
        }
    }
}