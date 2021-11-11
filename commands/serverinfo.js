const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "serverinfo",
    desciption: "get infos of server",

    async run(client, message, args) {
        if (message.channel.type === 'dm') return;
        const serverOwner = await message.guild.fetchOwner();

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(message.guild.iconURL)
            .setTitle("Server Info")
            .addField("**Owner:**", `${serverOwner}`, true)
            .addField("**Created At:**", `${message.guild.createdAt.toLocaleString()}`, true)
            .addField("**Member Count:**", `${message.guild.memberCount}`, true)
            .addField("**Emoji Count:**", `${message.guild.emojis.cache.size}`, true)
            .addField("**Roles Count:**", `${message.guild.roles.cache.size}`, true)
            .addField("**Tier Boots:**", `${message.guild.premiumTier}`, true)
            .addField("**Number of Boosts:**", `${message.guild.premiumSubscriptionCount}`, true)
            .setTimestamp();
        message.channel.send({ embeds: [embed] });
        console.log(`${message.author.username}#${message.author.discriminator} used Serverinfo command`)
    }
}