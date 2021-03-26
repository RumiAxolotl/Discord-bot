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
        "Not in a million years",
        "Maybe or Maybe not",
        "Not have any hope",
        "It is decidedly so",
        "It is certain",
        "As i see it, YES",
        "Can't be!",
        " Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don’t count on it",
        "Most likely",
        "My reply is NO",
        "My sources say NO",
        "Outlook not so good",
        "Outlook good",
        "Reply hazy, try again",
        "Signs point to YES",
        "Very doubtful",
        "Without a doubt",
        "You may rely on it",
      ];
      let response =
        responses[Math.floor(Math.random() * responses.length - 1)];
        let Embed = new Discord.MessageEmbed()
        .setTitle(`8Ball!`)
        .addField(`**Your Question:**`, `${ question }`)
        .addField(`**The Duck Seerer Reply:**`, `${ response } :duck:`)
        .setColor(`RANDOM`)
        .setThumbnail(`https://i.pinimg.com/originals/d7/36/6e/d7366eb0b396c3ed7a8d96e529b94ba4.jpg`)
        .setTimestamp();
      message.channel.send(Embed);
    }
  }
}