const functions = require("../functions.js");

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
		if (message.member && message.member.voice.channel) {
			message.client.commands.get("play").execute(message, [functions.randomSound("slur", 4)]);
		}
		else {
			message.channel.send("", { files: [functions.randomSound("slur", 4)] });
		}
	},
};