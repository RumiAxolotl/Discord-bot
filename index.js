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
    if (!message.content.startsWith(prefix)) {
        if (message.channel.id == '825682437861539850') {
            try {
                const res = await axios.get(`http://api.brainshop.ai/get?bid=155428&key=aE6dItjROvW72dv8&uid=1&msg=${encodeURIComponent(message.content)}`);
                const embed = new Discord.MessageEmbed();
                embed.setTitle(`**AI Ducky**`)
                    .setColor("RANDOM")
                    .setDescription(res.data.cnt)
                    .setFooter({
                        text: `Powah by Axolotl#9352`
                    })
                    .setThumbnail(`https://cdn.discordapp.com/icons/754326147566796811/148897d1d39622e4639cafa03b3d123a.png?size=4096`)
                    .setTimestamp();
                message.channel.send(embed);
            } catch (e) {
                message.channel.send({
                    embed: {
                        color: 16734039,
                        description: "Bot Is ERROR, Try Again Later!"
                    }
                }).then((sent) => {
                    setTimeout(function () {
                        sent.delete();
                    }, 2500);
                });
            }
        } else return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).run(client, message, args);

    } catch (error) {
        console.error(error);

    }
});










let announces = [
    "Nhớ uống nước đầy đủ nhé <3",
    "Để giữ sức khỏe, nhớ uống nước nha OwO",
    "My sweetie! Remember to drink water!",
    "Do you love me? Maybe not! But remember to drink water!",
    "Người ta sống không riêng bởi bánh, tất nhiên là cần uống nước đầy đủ nữa nhé!",
    "Muốn có một ngày thành công hơn? Đừng quên uống nước đầy đủ!"
];

let announce =
    announces[Math.floor(Math.random() * announces.length - 1)];

let Embed = new Discord.MessageEmbed()
    .setTitle(`Nhắc nhở uống nước!`)
    .setColor(`RANDOM`)
    .setDescription(announce)
    .setThumbnail(`https://i.pinimg.com/originals/6c/55/6d/6c556d5f1b8a7364f548e98b6230ac54.jpg`)
    .setTimestamp();

let task = new cron.CronJob('00 0,30 7-22 * * *', () => {
    let member1 = client.users.cache.get('968492300311343164');
    let member2 = client.users.cache.get('443728905908649985');
    member1.send({
        embeds: [Embed]
    });
    member2.send({
        embeds: [Embed]
    })
})

task.start();



client.login(config.token);