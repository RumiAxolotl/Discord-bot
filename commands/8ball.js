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
        "Yes",
        "No",
        "Definetly",
        "Absoloutely",
        "Not in a million years",
      ];
      let response =
        responses[Math.floor(Math.random() * responses.length - 1)];
        let Embed = new Discord.MessageEmbed()
        .setTitle(`8Ball!`)
        .addField(`Your question:`, `${ question }`)
        .addField(`My reply:`, `${ response }, Quack`)
        .setColor(`RANDOM`)
        .setTimestamp();
      message.channel.send(Embed);
    }
  }
}