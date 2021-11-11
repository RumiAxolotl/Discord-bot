const Discord = require('discord.js');
module.exports = {
    name: "help",
    description: "show commands of the bot",

    async run(client, message, args) {
        message.delete();
        const embed = new Discord.MessageEmbed()
            .setTitle('HELP')
            .setTimestamp()
            .setColor('#fcd303')
            .addField(`**Moderation:**`, "`kick`, `ban`, `mute`, `unmute`, `clear`")
            .addField(`**Fun:**`, "`kiss`, `hug`, `pat`, `slap`, `8ball`, `dog`, `cat`")
            .addField(`**Util:**`, "`ping`, `serverinfo`, `userinfo`, `channelcount`,`servercount`, `weather`, `say`")
            .addField(`**Other:**`, "`calculate`")
            .setFooter("Get the link with d*invite command!")
            .setThumbnail(`https://cdn.discordapp.com/icons/754326147566796811/148897d1d39622e4639cafa03b3d123a.png?size=4096`);
        message.channel.send({ embeds: [embed] });
    }
}
