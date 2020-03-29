const fileSystem = require("fs");
const discord = require("discord.js");

module.exports = class extends discord.Client {
	constructor(config) {
		super({});

		this.token = config.token;
		this.owners = config.botOwners;
		this.prefix = config.botPrefix;
		this.commands = new discord.Collection();
		this.cooldowns = new discord.Collection();
		this.botQueue = new Map();

		fileSystem.readdirSync("./commands").filter(file => file.endsWith(".js")).forEach(file => {
			const command = require(`./commands/${file}`);
			this.commands.set(command.name, command);
		});
	}
};