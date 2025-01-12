const Discord = require("discord.js");
const puppeteer = require("puppeteer");
const https = require("https");
const fs = require("fs");
const config = require("../config.json");
module.exports = {
    name: "crawl",
    description: "Crawl Data and Send to Channel",

    async run(client, message, args) {

        async function crawlFacebookFeed() {
            const browser = await puppeteer.launch({
                args: ["--incognito", "--start-maximized"],
                headless: false,
                defaultViewport: null,
            });
            const page = await browser.newPage();

            // Go to RSS.app Facebook feed creator
            await page.goto("https://rss.app/rss-feed/create-facebook-rss-feed", {
                waitUntil: "networkidle2"
            });

            // Input Facebook page URL
            await page.type('input[placeholder="Enter Facebook URL"]', config.facebookPageUrl);

            // Click create feed button
            await page.click('button[id="provider-submit"]');

            // Wait for results to load
            await page.waitForSelector('.MuiTypography-root.tss-vi4e79-FeedCardOverview-title');

            // Get all feed items
            const items = await page.$$eval('.MuiTypography-root.tss-vi4e79-FeedCardOverview-title', items => {
                return items.map(item => {
                    return {
                        title: item.innerText || '',
                        link: item.href || '',
                        date: item.closest('.feed-item')?.querySelector('.date')?.innerText || ''
                    }
                });
            });

            // Save results to file
            fs.writeFileSync('facebook-feed.json', JSON.stringify(items, null, 2));


            console.log(`Saved ${items.length} feed items`);
            

            // Get feed descriptions
            const descriptions = await page.$$eval('.tss-fbdtoj-FeedCardOverview-description', elements => {
                return elements.map(el => el.innerText || '');
            });

            // Add descriptions to items
            for (let i = 0; i < Math.min(items.length, descriptions.length); i++) {
                items[i].description = descriptions[i];
            }

            // Save updated results
            fs.writeFileSync('facebook-feed.json', JSON.stringify(items, null, 2));

            // Get dates
            const dates = await page.$$eval('.card-time', elements => {
                return elements.map(el => el.innerText || '');
            });

            // Add dates to items
            for (let i = 0; i < Math.min(items.length, dates.length); i++) {
                items[i].date = dates[i];
            }

            // Save updated results with dates
            fs.writeFileSync('facebook-feed.json', JSON.stringify(items, null, 2));

            await browser.close();
        }

        await crawlFacebookFeed();

        // Read the file
        const data = fs.readFileSync('facebook-feed.json', 'utf8');
        const items = JSON.parse(data);

        // Create an embed for each item
        const embeds = items.map(item => {
            return new Discord.MessageEmbed()
                .setTitle(item.title)
                .setURL(item.link)
                .setDescription(item.description)
                .setImage(item.imageUrl)
                .setTimestamp(new Date(item.date))
                .setColor("#b4befe");
        });

        // Get the channel to send to
        // const channel = message.guild.channels.cache.find(config.newsFeedChannelId);
        // console.log(config.newsFeedChannelId);
        // console.log(channel);
        // if (!channel) {
        //     console.error('Could not find channel');
        //     return;
        // }


        // Send the embeds
        for (const embed of embeds) {
            message.channel.send({ embeds: [embed] });

        }
    }
}
