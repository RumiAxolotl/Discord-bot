const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({
    intents: allIntents,
});

const prefix = process.env.PREFIX;

client.commands = new Discord.Collection();
const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    // Add aliases to the collection
    if (command.aliases) {
        command.aliases.forEach(alias => {
            client.commands.set(alias, command);
        });
    }
}
client.events = new Discord.Collection();
const eventFiles = fs
    .readdirSync("./events/")
    .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.on("error", console.error);
client.on("messageCreate", async (message) => {
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

client.login(process.env.TOKEN);