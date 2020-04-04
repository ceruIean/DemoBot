const functions = require("../util/functions.js");

module.exports = {
	name: "slur",
	aliases: [],
	description: "A way of pronouncing a word that is unclear, uncontrolled.",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,
	reaction: "",

	execute(message) {
		return message.client.commands.get("audio").execute(message, [functions.randomSound("slur", 4)]);
	},
};