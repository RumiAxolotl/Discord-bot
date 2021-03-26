const Discord = require("discord.js");
const { default_prefix } = require("../config.json");

module.exports = {
  name: "8ball",
  description: "There is a big chance I insult you!",
  async run (client, message, args){
    let question = message.content.slice(default_prefix.length + 6);
    if (!question)
      return message.channel.send(`You did not specify your question!`);
    else {
      let responses = [
        "Yas",
        "Nope",
        "Definetly",
        "Absoloutely",
        "Not in a million years",
        "Maybe or Maybe not",
        "Not have any hope",
        "It is decidedly so",
        "It is certain",
        "As i see it, YES"
        "Can't be!"
      ];
      let response =
        responses[Math.floor(Math.random() * responses.length - 1)];
        let Embed = new Discord.MessageEmbed()
        .setTitle(`8Ball!`)
        .addField(`**Your Question:**`, `${ question }`)
        .addField(`**The Duck Seerer Reply:**`, `${ response }, Quack`)
        .setColor(`RANDOM`)
        .setTimestamp();
      message.channel.send(Embed);
    }
  }
}