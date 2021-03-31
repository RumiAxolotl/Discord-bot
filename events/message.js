const { default_prefix } = require("../config.json");
let prefix = (config.default_prefix);
module.exports = (client, message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) {
        if (message.channel.id == '825792822254764104') {
            try {
                const res = await axios.get(`http://api.brainshop.ai/get?bid=155428&key=aE6dItjROvW72dv8&uid=1&msg=${encodeURIComponent(message.content)}`);
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`**AI Ducky**`)
                    .setColor("RANDOM")
                    .setDescription(res.data.cnt)
                    .setFooter(`Powah by Axolotl#9352`)
                    .setThumbnail(`https://cdn.discordapp.com/icons/754326147566796811/148897d1d39622e4639cafa03b3d123a.png?size=4096`)
                    .setTimestamp();
                message.channel.send(embed);
            }
            catch (e) {
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
        else return;
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).run(client, message, args);

    } catch (error) {
        console.error(error);
    }
}