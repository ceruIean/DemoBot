const logger = require("../logger.js");

module.exports = {
	name: "suicide",
	aliases: ["kill", "die"],
	description: "Kills the process.",
	category: "",
	usage: "",
	guildOnly: false,
	restricted: true,
	reaction: "💤",

	execute(message, args) {
		logger.info("I don't think they saw that one coming!");
        message.react(this.reaction).then(() => {
			process.exit();
		});
	},
};