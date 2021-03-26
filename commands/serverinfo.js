const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "serverinfo",
    desciption: "get infos of server",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(message.guild.iconURL)
            .addField(`${message.guild}'s informations`, stripIndents`**- Owner: ** ${message.guild.owner}
            **- Location: **${message.guild.region}
            **- Created At: **${message.guild.createdAt}
            ---------------------------------
            **+ Member Count: ** \`${message.guild.memberCount}\`
            **+ Emoji Count: ** \`${message.guild.emojis.cache.size}\`
            **+ Roles Count: ** \`${message.guild.roles.cache.size}\`
            ---------------------------------
            **- Tier Boots: ** ${message.guild.premiumTier}
            **- Number of Boosts: **  ${message.guild.premiumSubscriptionCount}
            `)
            .setTimestamp()
            .setThumbnail(`${message.guild.iconURL()}`);
        message.channel.send(embed)
    }
}