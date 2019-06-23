# DiscordBots Nation API(s)

An API Wrapper for [DiscordBots Nation API](https://discordbots-nats.glitch.me/api)

<div align="center">
    <p>
		<a href="https://npmjs.com/package/dbnapi.js"><img src="https://nodei.co/npm/dbnapi.js.png?downloads=true&stars=false"/></a>
		<br>
		<a href="https://travis-ci.com/discordbotsNation/dbnapi.js"><img src="https://travis-ci.com/discordbotsNation/dbnapi.js.svg"/></a>
		<a href="https://circleci.com/gh/discordbotsNation/dbnapi.js"><img src="https://circleci.com/gh/discordbotsNation/dbnapi.js.svg?style=svg"/></a>
	</p>
</div>

# Documentation
WIP :P

## How to install
```bash
npm i dbnapi.js --save
```

# Examples

## With async/await
```js
const Discord = require("discord.js");
const dbn = require("dbnapi.js");

const bot = new Discord.Client();
const dbn = new discordbotsNats("yOuRdIsCoRdBoTsNaTsApItOkEn", "Your Bot's User ID", "Your IDs");

bot.on("ready", () => console.log("Ready!"));

bot.on("message", async message => {
    var args = message.content.split(" ").replace(".", "");

    if (messsage.content === ".bot") {
        var botData = await dbn.getBot(args[0]);
        if (!botData || botData === undefined) return message.channel.send("Sorry, but that Bot was not registered *yet* on DiscordBots Nation.");
        message.channel.send(`${botData.bot.tag} by ${botData.owner.tag} with Prefix ${botData.prefix}!`);
    }
});

bot.login("yourDiscordBotToken");
```

## With .then() [Promises]
```js
const Discord = require("discord.js");
const dbn = require("dbnapi.js");

const bot = new Discord.Client();
const dbn = new discordbotsNats("yOuRdIsCoRdBoTsNaTsApItOkEn", "Your Bot's User ID", "Your IDs");

bot.on("ready", () => console.log("Ready!"));

bot.on("message", message => {
    var args = message.content.split(" ").replace(".", "");

    if (messsage.content === ".bot") {
        dbn.getBot(args[0]).then(botData => {
            if (!botData || botData === undefined) return message.channel.send("Sorry, but that Bot was not registered *yet* on DiscordBots Nation.");
            message.channel.send(`${botData.bot.tag} by ${botData.owner.tag} with Prefix ${botData.prefix}!`);
        });
    }
});

bot.login("yourDiscordBotToken");
```