const { ownerID } = require("../config.json");
module.exports = {
    name: "clear",
    description: "Clears messages",

    async run(client, message, args) {
        if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES') && message.author.id != ownerID)
            return message.channel.send("You don't have enough powah  use this command");
        if (!isNaN(message.content.split(' ')[1])) {
            let amount = 0;
            if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
                amount = 1;
            } else {
                amount = message.content.split(' ')[1];
                if (amount > 100) {
                    amount = 100;
                }
            }
            await message.channel.bulkDelete(amount, true).then((_message) => {
                message.channel.send(`${message.author} has burned \`${_message.size}\` messages :fire:`).then((sent) => {
                    setTimeout(function () {
                        sent.delete();
                    }, 2500);
                });
            });
        } else {
            message.channel.send('Enter the amount of messages you wanna burned').then((sent) => {
                setTimeout(function () {
                    sent.delete();
                }, 2500);
            });
        }
    }
}