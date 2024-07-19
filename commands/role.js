const { MessageEmbed } = require("discord.js");
const { default_prefix } = process.env.PREFIX;
const ownerID = process.env.DEVID;
module.exports = {
    name: "role",
    description: "A role utility command",
    async run(client, message, args) {
        if (!message.member.permissionsIn(message.channel).has("MANAGE_ROLES") && message.author.id != ownerID)
            return message.channel.send(
                `You don't have enough powah to use this command, ${message.author.username}`
            );
        if (args[0].toLowerCase() == "create") {
            let rName = message.content.split(`${default_prefix}role create `).join("");
            let rColor;
            args.forEach((arg) => {
                if (arg.startsWith("#")) {
                    rColor = arg;
                }
            });
            if (!rName) {
                return message.channel.send(
                    `You did not specify a name for your role!`
                );
            }
            if (!rColor) {
                return message.channel.send(
                    `You did not specify a color for your role!`
                );
            }
            if (rColor >= 16777215)
                return message.channel.send(
                    `That hex color range was too big! Keep it between 0 and 16777215`
                );
            if (rColor <= 0)
                return message.channel.send(
                    `That hex color range was too small! Keep it between 0 and 16777215`
                );
            rName = rName.replace(`${rColor}`, ``);
            let rNew = await message.guild.roles.create({
                name: `${rName}`, color: `${rColor}`, reason: `Role create command`
            });
            const Embed = new MessageEmbed()
                .setTitle(`New role!`)
                .setDescription(
                    `**${message.author.username} has created the role **"${rName}"\n**Its Hex Color Code: **${rColor}\n**Its ID: **${rNew.id}`
                )
                .setColor(rColor);
            message.channel.send({ embeds: [Embed] });
        } else if (args[0].toLowerCase() == "delete") {
            let roleDelete =
                message.guild.roles.cache.get(args[1]) ||
                message.guild.roles.cache.find((r) => r.name == args[1]);
            if (!roleDelete)
                return message.channel.send(
                    `You did not specify the name or id of the role you wish to delete!`
                );
            roleDelete.delete();
            const Embed1 = new MessageEmbed()
                .setTitle(`Deleted role!`)
                .setColor(roleDelete.color)
                .setDescription(
                    `**${message.author.username} has deleted the role **"${roleDelete.name}"\n**Its ID: **${roleDelete.id}\n**Its Hex Color Code: **${roleDelete.color}`
                );
            message.channel.send({ embeds: [Embed1] });
        }
    }
}