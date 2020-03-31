// DemoBot v1.0.0
// https://discordapp.com/oauth2/authorize?client_id=684871111850197019&scope=bot&permissions=3202048

const discord = require("discord.js");
const client = require("./client.js");
const config = require("./config.json");
const functions = require("./functions.js");
const logger = require("./logger.js");

const bot = new client(config);
logger.info(" _____     ______     __    __     ______     ______     ______     ______  ");
logger.info("/\\  __-.  /\\  ___\\   /\\ \"-./  \\   /\\  __ \\   /\\  == \\   /\\  __ \\   /\\__  _\\ ");
logger.info("\\ \\ \\/\\ \\ \\ \\  __\\   \\ \\ \\-./\\ \\  \\ \\ \\/\\ \\  \\ \\  __<   \\ \\ \\/\\ \\  \\/_/\\ \\/ ");
logger.info(" \\ \\____-  \\ \\_____\\  \\ \\_\\ \\ \\_\\  \\ \\_____\\  \\ \\_____\\  \\ \\_____\\    \\ \\_\\ ");
logger.info("  \\/____/   \\/_____/   \\/_/  \\/_/   \\/_____/   \\/_____/   \\/_____/     \\/_/ \r\n");

logger.debug("BOT OWNER(S):");
logger.debug(`${bot.owners.join(", ")}\r\n`);
logger.debug("AVAILABLE COMMANDS:");
logger.debug(`${[...bot.commands.keys()].join(", ")}\r\n`);

bot.once("ready", () => {
	logger.info("What makes me a good DemoBot? If I were a bad DemoBot, I wouldn't be sittin' here discussin' it with you, now would I?");
	bot.user.setActivity("ya!", { type: "LISTENING" });
	process.send("ready");
});

bot.on("message", async message => {
	const commandArgs = message.content.slice(bot.prefix.length).split(/ +/);
	const commandName = commandArgs.shift().toLowerCase();
	const command = bot.commands.get(commandName) || bot.commands.find(c => c.aliases && c.aliases.includes(commandName));

	if (message.author.bot) {
		return;
	}

	if (message.content.includes("ka boom")) {
		message.react("💥");
		return bot.commands.get("kaboom").execute(message, commandArgs);
	}

	if (!message.content.startsWith(bot.prefix)) {
		// begone, devil
		if (message.content.includes("uwu")) {
			message.client.commands.get("audio").execute(message, [ "uwu", 1 << 4 ]);
		}
		return;
	}

	if (!command || !bot.owners.includes(message.author.id) && (command.restricted || command.hidden)) {
		if (command.restricted) {
			logger.info(`${message.author.id} cannot execute "${command.name}"`);
		}
		return message.channel.send(`What's that, lad? Type \`${bot.prefix}help\` if you need some.`);
	}

	if (command.usage && !commandArgs.length) {
		return message.channel.send(`${bot.prefix}${command.name} \`${command.usage}\``);
	}

	if (command.guildOnly && !message.member) {
		return message.channel.send("Oh me mother Tilly. You're supposed to be in a server, lad!");
	}

	if (!bot.cooldowns.has(command.name)) {
		bot.cooldowns.set(command.name, new discord.Collection());
	}

	const currentTime = Date.now();
	const callTimestamps = bot.cooldowns.get(command.name);
	const cooldownSeconds = 1000 * (command.cooldown);

	if (callTimestamps.has(message.author.id)) {
		const nextValidTime = callTimestamps.get(message.author.id) + cooldownSeconds;
		if (currentTime < nextValidTime) {
			const delta = (nextValidTime - currentTime) / 1000;
			return message.channel.send(`I need exactly ${delta.toFixed(2)} seconds before I can do that, lad! Trust me!`);
		}
	}

	callTimestamps.set(message.author.id, currentTime);
	setTimeout(() => callTimestamps.delete(message.author.id), cooldownSeconds);

	try {
		if (message.member) {
			logger.info(`[GUILD MESSAGE] [${message.guild.id} / ${message.author.id}] [${message.guild.name} / ${message.author.tag}]: ${message.content}`, true);
		}
		else {
			logger.info(`[DIRECT MESSAGE] [${message.author.id} / ${message.author.tag}]: ${message.content}`, true);
		}

		if (command.execute(message, commandArgs) && command.reaction) {
			message.react(command.reaction);
		}
	}
	catch (error) {
		logger.error(error);
		message.channel.send(`Something went wrong! ${functions.randomResponse(0)}`);
	}
});

bot.once("disconnect", () => {
	logger.info("DemoBot is out, lads!");
});

process.on("message", function(message) {
	if (message == "shutdown") {
		logger.info("DemoBot is out, lads!\r\n");
		process.exit(0);
	}
});

bot.login(bot.token);