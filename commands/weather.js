const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "weather",
    description: "Checks a weather forecast",

    async run(client, message, args) {

        weather.find({
            search: args.join(" "),
            degreeType: 'C'
        }, function (error, result) {
            // 'C' can be changed to 'F' for farneheit results
            if (error) return message.channel.send(error);
            if (!args[0]) return message.channel.send('Please specify a location')

            if (result === undefined || result.length === 0) return message.channel.send('**Invalid** location');

            var current = result[0].current;
            var location = result[0].location;

            const weatherinfo = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor({
                    name: `Weather forecast for ${current.observationpoint}`
                })
                .setThumbnail(current.imageUrl)
                .setColor("#fcd303")
                .addFields({
                        name: 'Timezone',
                        value: `UTC${location.timezone}`,
                        inline: true
                    }, {
                        name: 'Degree Type',
                        value: 'Celsius',
                        inline: true
                    }, {
                        name: 'Temperature',
                        value: `${current.temperature}°`,
                        inline: true
                    }, {
                        name: 'Wind',
                        value: `${current.winddisplay}`,
                        inline: true
                    }, {
                        name: 'Feels like',
                        value: `${current.feelslike}°`,
                        inline: true
                    }, {
                        name: 'Humidity',
                        value: `${current.humidity}%`,
                        inline: true
                    },

                )

            message.channel.send({
                embeds: [weatherinfo]
            });
        })
    }
}