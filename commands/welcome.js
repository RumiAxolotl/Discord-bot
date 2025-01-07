const Discord = require("discord.js");

module.exports = {
    name: "welcome",
    aliases: ["wlc"],
    description: "Sends a welcome message",

    async run(_client, message, _args) {
        if (message.channel.type === "dm") return;

        const member = message.mentions.members.first();

        if (!member) {

            const welcomeEmbed = new Discord.MessageEmbed()
                .setColor("#b4befe")
                .setTitle(` <a:timbayxanhduong:699989307917861047> Chào mừng đến với JS <a:timbayxanhduong:699989307917861047> `)
                .setDescription(` <a:Notice:1325732909310672927> Bạn nhớ đọc luật ở <#608607531547492362> 

                <a:Notice:1325732909310672927> Lấy vai trò tương ứng ở <#619763544141070336>

                <a:Notice:1325732909310672927> Và giới thiệu bản thân ở <#701786434314436668> nha!
            `)

            message.channel.send({
                embeds: [welcomeEmbed],
            });
        }

        else {
            const welcomeEmbed = new Discord.MessageEmbed()
                .setColor("#b4befe")
                .setTitle(` <a:timbayxanhduong:699989307917861047> Chào mừng đến với JS <a:timbayxanhduong:699989307917861047> `)
                .setDescription(` <a:Notice:1325732909310672927> Chào mừng ${member} đến với JS

                <a:Notice:1325732909310672927> Bạn nhớ đọc luật ở <#608607531547492362> 

                <a:Notice:1325732909310672927> Lấy vai trò tương ứng ở <#619763544141070336>

                <a:Notice:1325732909310672927> Và giới thiệu bản thân ở <#701786434314436668> nha!
            `)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

            message.channel.send({
                embeds: [welcomeEmbed],
            });
        }
    }
};
