const functions = require("../functions.js");

module.exports = {
	name: "slur",
	aliases: [],
	description: "A way of pronouncing a word that is unclear, uncontrolled.",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,

	execute(message, args) {
		if (message.member && message.member.voice.channel) {
			message.client.commands.get("play").execute(message, [functions.getRandomSound("slur", 4)]);
		} else {
			message.channel.send("", { files: [functions.getRandomSound("slur", 4)] });
		}
	},
};