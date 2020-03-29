const logger = require("../logger.js");

module.exports = {
	name: "kill",
	aliases: ["quit", "die"],
	description: "Kills the process.",
	category: "",
	usage: "",
	guildOnly: false,
	restricted: true,
	reaction: "💤",

	execute(message) {
		logger.info("See");
		message.react(this.reaction).then(() => {
			process.exit();
		});
	},
};