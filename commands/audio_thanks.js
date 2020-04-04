const functions = require("../util/functions.js");

module.exports = {
	name: "thanks",
	aliases: ["thx"],
	description: "An expression of gratitude.",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,
	reaction: "",

	execute(message) {
		return message.client.commands.get("audio").execute(message, [functions.randomSound("thanks", 3)]);
	},
};