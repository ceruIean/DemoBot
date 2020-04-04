const functions = require("../util/functions.js");

module.exports = {
	name: "cheers",
	aliases: ["good"],
	description: "A loud shout of approval or encouragement.",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,
	reaction: "👍",

	execute(message) {
		return message.client.commands.get("audio").execute(message, [functions.randomSound("cheers", 8)]);
	},
};