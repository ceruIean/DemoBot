const functions = require("../functions.js");

module.exports = {
	name: "no",
	aliases: ["n", "nah"],
	description: "An expression of disapproval or disagreement.",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,
	reaction: "",

	execute(message) {
		message.client.commands.get("audio").execute(message, [functions.randomSound("no", 3)]);
	},
};