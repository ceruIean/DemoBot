//
// DemoBot v1.0.0
//
// https://discordapp.com/oauth2/authorize?client_id=684871111850197019&scope=bot&permissions=3202048
//
// Previous Permissions: 52224
// Current Permissions: 3202048

const Discord = require("discord.js");
const Client = require("./client.js");
const config = require("./config.json");
const functions = require("./functions.js");

const bot = new Client(config);

console.log("  --- -------/------ ---  ");
console.log("--/-- DemoBot v1.0.0 --/--");
console.log("  --- ------/------- ---  ");
console.log("\r\nBOT OWNER(S):");
console.log(bot.owners);
console.log("\r\nAVAILABLE COMMANDS:");
console.log(bot.commands);

bot.once("ready", () => {
    console.log("What makes me a good DemoBot?\r\nIf I were a bad DemoBot, I wouldn't be sittin' here discussin' it with you, now would I?");
});

bot.on("message", async message => {
    const commandArgs = message.content.slice(bot.prefix.length).split(/ +/);
    const commandName = commandArgs.shift().toLowerCase();
    const command = bot.commands.get(commandName) || bot.commands.find(command => command.aliases && command.aliases.includes(commandName));

    if (message.author.bot) {
        return;
    }

    if (message.content.includes("uwu")) {
        return bot.commands.get("uwu").execute(message, commandArgs);
    } else if (message.content.includes("ka boom")) {
        return bot.commands.get("kaboom").execute(message, commandArgs);
    }

    if (!message.content.startsWith(bot.prefix)) {
        return;
    }

    if (!command) {
        return message.channel.send(`You need help lad? Type \`${bot.prefix}help\` to get started.`);
    }

    if (command.restricted && !bot.owners.includes(message.author.id)) {
        return;
    }

    if (command.usage && !commandArgs.length) {
        return message.channel.send(`${bot.prefix}${commandName} \`${command.usage}\``);
    }

    if (command.guildOnly && !message.member) {
        return message.channel.send("I can't do that here, you must be in a server, lad!");
    }
    
    if (!bot.cooldowns.has(commandName)) {
        bot.cooldowns.set(commandName, new Discord.Collection());
    }

    const currentTime = Date.now();
    const callTimestamps = bot.cooldowns.get(commandName);
    const cooldownSeconds = (command.cooldown) * 1000;

    if (callTimestamps.has(message.author.id)) {
        const nextValidTime = callTimestamps.get(message.author.id) + cooldownSeconds;
        if (currentTime < nextValidTime) {
            const delta = (nextValidTime - currentTime) / 1000;
            return message.channel.send(`I need ${delta.toFixed(1)} seconds before I can do that, lad.`);
        }
    }

    callTimestamps.set(message.author.id, currentTime);
    setTimeout(() => callTimestamps.delete(message.author.id), cooldownSeconds);

    try {
        if (message.member) {
            console.log(`[${new Date().toLocaleDateString()}][${message.guild.name} / ${message.guild.id}] ${message.member.displayName} (${message.author.tag} / ${message.author.id}) : ${message.content}`);
        } else {
            console.log(`[${new Date().toLocaleDateString()}] ${message.author.username} (${message.author.tag} / ${message.author.id}) : ${message.content}`);
        }
        command.execute(message, commandArgs);
    } catch (error) {
        console.error(error);
        message.channel.send(functions.getRandomResponse(0));
    }
});

bot.once("disconnect", () => {
    console.log("I'm out, lad!");
});

bot.login(bot.token);