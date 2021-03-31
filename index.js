const Discord = require('discord.js');

const client = new Discord.Client();

const { token, default_prefix } = require('./config.json');

const fs = require('fs');

const { join } = require('path');

const config = require('./config.json');

const axios = require('axios');

let prefix = (config.default_prefix);


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
    const eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
}



client.on("error", console.error);

client.on('ready', () => {
    console.log(`${client.user.username} is ready, Quack`);
    client.user.setActivity(`Rubber Duck`)
});




client.login(config.token);