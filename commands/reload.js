const logger = require("../logger.js");

module.exports = {
	name: "reload",
	aliases: ["r"],
	description: "Reloads a command for debugging purposes.",
	category: "",
	usage: "<command | all>",
	guildOnly: false,
	restricted: true,
	reaction: "🔄",

	execute(message, args) {
		const commandName = args[0].toLowerCase();

		if (commandName === "all") {
			message.client.commands.forEach((command, name) => {
				this.reloadCommand(message, command.category ? `${command.category}_${name}` : name);
			});
			return true;
		}

		this.reloadCommand(message, commandName);
	},

	reloadCommand(message, commandName) {
		logger.debug(`Reloading "${commandName}"`);
		delete require.cache[require.resolve(`./${commandName}.js`)];

		try {
			const reloadedCommand = require(`./${commandName}.js`);
			return message.client.commands.set(reloadedCommand.name, reloadedCommand);
		}
		catch (error) {
			logger.error(error);
		}
	},
};