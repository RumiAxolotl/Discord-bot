const Discord = require('discord.js');

const cron = require('cron');

const config = require('./config.json');

const allIntents = new Discord.Intents(32767);



const client = new Discord.Client({
    intents: allIntents
});




let prefix = (config.default_prefix);

const fs = require('fs');





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



client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).run(client, message, args);

    } catch (error) {
        console.error(error);

    }
});

let schedule = new cron.CronJob('00 0,30 * * * *', () => {
    let member = client.users.cache.get('968492300311343164');
    member.send("Nhớ uống nước nhé <3")
})

schedule.start();

client.login(config.token);