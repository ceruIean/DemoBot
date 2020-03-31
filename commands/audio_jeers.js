const functions = require("../functions.js");

module.exports = {
	name: "jeers",
	aliases: ["bad"],
	description: "A way of shouting insults at someone to show a lack of respect.",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,
	reaction: "👎",

	execute(message) {
		message.client.commands.get("audio").execute(message, [functions.randomSound("jeers", 8)]);
	},
};