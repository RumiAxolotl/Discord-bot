const Discord = require("discord.js");
module.exports = {
    name: "userinfo",
    description: "get information of user",


    async run(client, message, args) {
        //check if more than 1 user is mentioned
        if (args.length > 1) return message.channel.send('Only mention one user!');

        //check if there is no arguments
        if (!args[0]) return message.channel.send('Mention someone!');

        //check if there is 1 argument
        if (args[0]) {
            //get the first user mentioned
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            //if the member exists create an embed with info about that user and send it to the channel
            if (member) {
                let embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${member.user.username}'s Info`)
                    .setThumbnail(member.user.displayAvatarURL())
                    .addFields({
                        name: "**Username:**",
                        value: `${member.user.username}`,
                        inline: true
                    }, {
                        name: "**Discriminator:**",
                        value: `#${member.user.discriminator}`,
                        inline: true
                    }, {
                        name: "**ID:**",
                        value: `${member.user.id}`,
                        inline: true
                    }, {
                        name: "**Joined On:**",
                        value: `${member.joinedAt.toLocaleString()}`,
                        inline: true
                    }, {
                        name: "**Created On:**",
                        value: `${member.user.createdAt.toLocaleString()}`,
                        inline: true
                    },

                    )
                    .setDescription(`${member.roles.cache.map(role => role.toString()).join(' ')}`)
                    .setTimestamp()

                message.channel.send({
                    embeds: [embed]
                });
            } else {
                message.channel.send(`Could not find that member`); //send a message to the channel if the user doesn't exist
            }
        }
    }
}