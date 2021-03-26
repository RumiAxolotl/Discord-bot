const Discord = require('discord.js');
const { count } = require('../count.json');
const fs = require('fs');
const { cfschannelID, logchannelID } = require('../config.json');
const picExt = [".webp", ".jpg", ".png", ".jpeg", ".gif"];
const videoExt = [".mp4", ".webm", ".mov"];
module.exports = {
  name: "cfs",
  description: "Sending cfs to channel",
  async run(client, message, args) {
    if (message.channel.type !== 'dm') return;//khong chap nhan tin nao tru tin nhan gui thang truc tiep
    if (message.content.length > 1024) return message.channel.send('Please write confession shorter than 1024 Quack!');
    else {
      await message.react('🦆');
      message.channel.send('Sent confession successfully Quack !');
      let count = JSON.parse(fs.readFileSync('./count.json')).count;
      count++;
      const cfsChannel = client.channels.cache.get(cfschannelID);
      if (!cfsChannel) return;
      const embed = new Discord.MessageEmbed().setColor('RANDOM').setTitle("❤️ **CONFESSION** ❤️");
      embed
        .setDescription(message.content.slice(6))
        .setFooter(`cfs# ${count}`)
        .setThumbnail('https://cdn.discordapp.com/emojis/755053057984692275.png')
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

      const logChannel = client.channels.cache.get(logchannelID);
      if (logChannel) {
        const logembed = new Discord.MessageEmbed().setColor('RANDOM').setTitle("❤️ **CONFESSION** ❤️");
        logembed
          .setDescription(message.content.slice(6))
          .setFooter(`cfs# ${count}`)
          .setThumbnail('https://cdn.discordapp.com/icons/754326147566796811/148897d1d39622e4639cafa03b3d123a.png?size=4096')
          .addField(`Author's name: `, `${ message.author.username }`)
          .setTimestamp();
        if (message.attachments.array().length > 0) {
          let attachment = message.attachments.array()[0];
          picExt.forEach(ext => {
            if (attachment.name.endsWith(ext))
              logembed.setImage(attachment.attachment);
          });
          videoExt.forEach(ext => {
            if (attachment.name.endsWith(ext))
              logChannel.send(attachment);
          });
        }
        logChannel.send(logembed);
      }
      else console.log(`Can't find logcfs channel!`)
    
      cfsChannel.send(embed);
      fs.writeFileSync('./count.json', JSON.stringify({ count: count }));
    }
  }
}