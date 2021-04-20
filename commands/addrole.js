const Disord = require("discord.js");
const { ownerID } = require("../config.json");
module.exports = {
    name: "addrole",
    description: "Add a role to member!!",
    async run(client, message, args) {
        if (!message.member.permissions.has("MANAGE_ROLES") && message.author.id != ownerID)
            return message.channel.send(
                `You don't have enough powah to use this command, ${message.author.username}`
            );
        let member = message.mentions.users.first() || message.guilds.member.cache.get(args[0]);
        if (!member) return message.channel.send({
            embed: {
                color: 16734039,
                description: "Please mention someone you want to add role!!"
            }
        });
        let role = message.mentions.roles.first() || message.guilds.role.cache.get(args[1]);
        if (!role) return message.channel.send({
            embed: {
                color: 16734039,
                description: "Please mention the role you want to add!!"
            }
        });
        await member.roles.add(role);
        const embed = new Disord.MessageEmbed();
        embed.setTitle("**ADDROLE**")
            .addField("**Member**", member.username)
            .addField("**Moderator**", message.author.username)
            .setTimestamp();
        
        message.channel.send(embed).then((sent) => {
            setTimeout(function () {
                sent.delete();
            }, 2500);
        });

    }
}
