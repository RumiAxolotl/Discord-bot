const Discord = require('discord.js');

const client = new Discord.Client();

const { token, default_prefix } = require('./config.json');

const fs = require('fs');

const { join } = require('path');

const config = require('./config.json');

const axios = require('axios');

let prefix = ("d*","D*");


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.events = new Discord.Collection();
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}


client.on("error", console.error);


client.on("message", async message => {

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) {
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
})



client.login(config.token);