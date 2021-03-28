const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    async run (client, message, args) {
    if(message.channel.type === 'dm') return;
            if (!message.mentions.users.size) {     
        let embed = new Discord.message()
		
          .setColor("RANDOM")
          .setAuthor(message.author.username + "'s Avatar", message.author.displayAvatarURL)
          .setImage(message.author.displayAvatarURL)  
        
        message.channel.send(embed)
    }

    const avatarList = message.mentions.users.map(user => {
        return `${user.username},${user.displayAvatarURL}`;
    });

    for (var i = 0; i < avatarList.length; i++) {
        let Username = avatarList[i].split(',')[0];
        let AvatarURL = avatarList[i].split(",").pop();

        let embed = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor(Username + "'s Avatar", AvatarURL)
          .setImage(AvatarURL)
        
        message.channel.send(embed);
    }
}
    }
