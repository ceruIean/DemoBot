const functions = require("../functions.js");

module.exports = {
	name: "thanks",
	aliases: ["thx"],
	description: "An expression of gratitude.",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,
	reaction: "",

	execute(message, args) {
		if (message.member && message.member.voice.channel) {
			message.client.commands.get("play").execute(message, [functions.randomSound("thanks", 3)]);
		} else {
			message.channel.send("", { files: [functions.randomSound("thanks", 3)] });
		}
	},
};