const Discord = require('discord.js');
const cron = require('cron');
const fs = require('fs');

const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({
    intents: allIntents
});

const config = require('./config.json');
const waterannounce = require('./waterannounce.json');
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




let task = new cron.CronJob('00 0,30 * * * *', () => {
    waterannounce.members.forEach(function (member) {
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
        if (announce == undefined) {
            announce = announces[Math.floor(Math.random() * announces.length - 1)]
        };
        let getUser = client.users.cache.get(`${member.ID}`);
        let Embed = new Discord.MessageEmbed()
            .setTitle(`Lời nhắc yêu thương gửi đến ${getUser.username} `)
            .setColor(`RANDOM`)
            .setDescription(`${announce}`)
            .setThumbnail(`https://i.pinimg.com/originals/6c/55/6d/6c556d5f1b8a7364f548e98b6230ac54.jpg`)
            .setFooter({
                text: `Những nhắc nhở yêu thương <3`
            })
            .setTimestamp();
        getUser.send({
            embeds: [Embed]
        });
    })
})

task.start();



client.login(config.token);