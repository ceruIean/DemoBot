const functions = require("../util/functions.js");

module.exports = {
	name: "yes",
	aliases: ["y", "aye"],
	description: "An expression of approval or agreement.",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,
	reaction: "",

	execute(message) {
		return message.client.commands.get("audio").execute(message, [functions.randomSound("yes", 3)]);
	},
};