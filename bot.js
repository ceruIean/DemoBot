// DemoBot v1.0.0
// https://discordapp.com/oauth2/authorize?client_id=684871111850197019&scope=bot&permissions=3202048

const discord = require("discord.js");
const client = require("./client.js");
const config = require("./config.json");
const functions = require("./functions.js");
const logger = require("./logger.js");

const bot = new client(config);
console.log("  --- -------/------ ---  ");
console.log("--/-- DemoBot v1.0.0 --/--");
console.log("  --- ------/------- ---  ");
console.log("\r\nBOT OWNER(S):");
console.log(bot.owners);
console.log("\r\nAVAILABLE COMMANDS:");
console.log(bot.commands);

bot.once("ready", () => {
	logger.info("What makes me a good DemoBot? If I were a bad DemoBot, I wouldn't be sittin' here discussin' it with you, now would I?\r\nReady.");
	bot.user.setActivity("ya", { type: "LISTENING" });
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
			return bot.commands.get("uwu").execute(message, commandArgs);
		}
		return;
	}

	if (!command) {
		return message.channel.send(`What's that, lad? Type \`${bot.prefix}help\` if you need some.`);
	}

	if (command.restricted && !bot.owners.includes(message.author.id)) {
		logger.info(`${message.author.id} tried to execute "${command.name}"`);
		return;
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
			logger.info(`[${message.guild.name} / ${message.guild.id}] ${message.member.displayName} (${message.author.tag} / ${message.author.id}) : ${message.content}`, true);
		}
		else {
			logger.info(`${message.author.username} (${message.author.tag} / ${message.author.id}) : ${message.content}`, true);
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

bot.login(bot.token);