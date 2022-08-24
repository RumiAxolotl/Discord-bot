const Discord = require("discord.js");
module.exports = {
    name: "userinfo",
    desciption: "get infos of user",


    async run(client, message, args) {
        //check if more than 1 user is mentioned
        if (args.length > 1) return message.channel.send('Only mention one user!');

        //check if there is no arguments
        if (!args[0]) return message.channel.send('Mention someone!');

        //check if there is 1 argument
        if (args[0]) {
            //get the first user mentioned
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            //if the member exists create an embed with info about that user and send it to the channel
            if (member) {
                let embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${member.user.username}'s Info`)
                    .setThumbnail(member.user.displayAvatarURL())
                    .addField("**Username:**", `${member.user.username}`, true)
                    .addField("**Discriminator:**", `#${member.user.discriminator}`, true)
                    .addField("**ID:**", `${member.user.id}`, true)
                    .addField("**Joined On:**", `${member.joinedAt.toLocaleString()}`, true)
                    .addField("**Created On:**", `${member.user.createdAt.toLocaleString()}`, true)
                    .setDescription(`${member.roles.cache.map(role => role.toString()).join(' ')}`)
                    .setTimestamp()

                message.channel.send({embeds: [embed]});
            } else {
                message.channel.send(`Could not find that member`); //send a message to the channel if the user doesn't exist
            }
        }
        console.log(`${message.author.username}#${message.author.discriminator} used Userinfo command`)
    }
}