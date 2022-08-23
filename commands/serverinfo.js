const Discord = require("discord.js");
const {
    stripIndents
} = require("common-tags");

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
            .addFields({
                    name: "**Owner:**",
                    value: `${serverOwner}`,
                    inline: true
                }, {
                    name: "**Created At:**",
                    value: `${message.guild.createdAt.toLocaleString()}`,
                    inline: true
                }, {
                    name: "**Member Count:**",
                    value: `${message.guild.memberCount}`,
                    inline: true
                }, {
                    name: "**Emoji Count:**",
                    value: `${message.guild.emojis.cache.size}`,
                    inline: true
                }, {
                    name: "**Roles Count:**",
                    value: `${message.guild.roles.cache.size}`,
                    inline: true
                }, {
                    name: "**Tier Boots:**",
                    value: `${message.guild.premiumTier}`,
                    inline: true
                }, {
                    name: "**Number of Boosts:**",
                    value: `${message.guild.premiumSubscriptionCount}`,
                    inline: true
                },
            )
            .setTimestamp();
        message.channel.send({
            embeds: [embed]
        });
        console.log(`${message.author.username}#${message.author.discriminator} used Serverinfo command`)
    }
}