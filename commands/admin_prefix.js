const fileSystem = require("fs");
const client = require("../client.js");
const logger = require("../util/logger.js");

module.exports = {
	name: "prefix",
	aliases: ["pre"],
	description: "Changes bot command prefix.",
	category: "admin",
	usage: "<new>",
	guildOnly: false,
	restricted: true,
	reaction: "",

	execute(message, args) {
		if (args[0].length > 5) {
			return;
		}

		try {
			const config = JSON.parse(fileSystem.readFileSync("./config.json"));
			config.prefix = args[0];
			message.client.bot = new client(config);
		}
		catch (error) {
			logger.error(error.message);
		}

		message.client.commands.forEach((command, name) => {
			this.reloadCommand(message, command.category ? `${command.category}_${name}` : name);
		});
	},

	reloadCommand(message, commandName) {
		delete require.cache[require.resolve(`./${commandName}.js`)];

		try {
			const reloadedCommand = require(`./${commandName}.js`);
			message.client.commands.set(reloadedCommand.name, reloadedCommand);
		}
		catch (error) {
			logger.error(error);
		}
	},
};