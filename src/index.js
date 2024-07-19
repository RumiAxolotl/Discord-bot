// Require the necessary discord.js classes
const { Client, IntentsBitField } = require('discord.js');
const dotenv = require('dotenv')

dotenv.config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
    ]
});


client.on('ready', client => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);