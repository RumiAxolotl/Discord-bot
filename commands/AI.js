const axios = require('axios');
const Discord = require('discord.js');
module.exports = {
    name: "ai",
    description: "smart bot",

    async run(client, message, args) {
        message.delete();
        try {
            const res = await axios.get(`
            http://api.brainshop.ai/get?bid=155428&key=aE6dItjROvW72dv8&uid=1&msg=${encodeURIComponent(args.slice(1).join(" "))}`);
            message.channel.send(res.data.cnt);
        }
        catch (err) {
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