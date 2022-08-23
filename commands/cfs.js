const Discord = require('discord.js');
const fs = require('fs');
const picExt = [".webp", ".jpg", ".png", ".jpeg", ".gif"];
const videoExt = [".mp4", ".webm", ".mov"];
module.exports = {
    name: "cfs",
    description: "Sending cfs to channel",
    async run(client, message, args) {
        let cfschannelID = '1011557606801809430';
        if (message.channel.type !== 'dm') return; //khong chap nhan tin nao tru tin nhan gui thang truc tiep
        if (message.content.length > 1024) return message.channel.send('Please write confession shorter than 1024 Quack!');
        else {
            await message.react('❤️');
            message.channel.send('Gửi cfs thành công!');
            let count = JSON.parse(fs.readFileSync('./count.json')).count;
            count++;
            const cfsChannel = client.channels.cache.get(cfschannelID);
            if (!cfsChannel) return;
            const embed = new Discord.MessageEmbed().setColor('RANDOM').setTitle(`❤️ **CONFESSION** ❤️`);
            embed
                .setDescription(message.content.slice(6))
                .setFooter(`d*cfs[content]`)
                .setThumbnail(`https://cdn.discordapp.com/icons/608544000298713108/a_f771f7e011a4cd9fff34fde405d73781.gif`)
                .setTimestamp();
            if (message.attachments.array().length > 0) {
                let attachment = message.attachments.array()[0];
                picExt.forEach(ext => {
                    if (attachment.name.endsWith(ext))
                        embed.setImage(attachment.attachment);
                });
                videoExt.forEach(ext => {
                    if (attachment.name.endsWith(ext))
                        cfsChannel.send(attachment);
                });
            }

            cfsChannel.send(embed);
            fs.writeFileSync('./count.json', JSON.stringify({
                count: count
            }));
        }
    }
}