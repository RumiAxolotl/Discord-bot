const Discord = require('discord.js');
module.exports = {
    name: "help",
    description: "show commands of the bot",

    async run(client, message, args) {
        message.delete();
        const embed = new Discord.MessageEmbed();
        embed.setTitle('HELP')
            .setTimestamp()
            .setColor('#fcd303')
            .addField(`**Moderation:**`, "`kick`, `ban`, `mute`, `unmute`, `slowmode`, `clear`")
            .addField(`**Fun:**`, "`kick`, `hug`, `pat`, `slap`, `tickle`, `poke`, `8ball`")
            .addField(`**Util:**`, "`ping`, `serverinfo`, `userinfo`, `channelcount`,`servercount`, `weather`, `poll`, `say`")
            .addField(`**NSFW**:`, "`nsfw`, `cum`, `spank`, `femdom`")
            .addField(`**Other:**`, "`cfs`, `calculate`")
            .setFooter("Get the link with d*invite command!")
            .setThumbnail(`https://cdn.discordapp.com/icons/754326147566796811/148897d1d39622e4639cafa03b3d123a.png?size=4096`);
        message.channel.send(embed);
    }
}
