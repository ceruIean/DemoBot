const functions = require("../functions.js");

module.exports = {
	name: "thanks",
	aliases: ["thx"],
	description: "An expression of gratitude.",
	usage: "",
	guildOnly: false,
	restricted: false,

	execute(message, args) {
		if (message.member && message.member.voice.channel) {
			message.client.commands.get("play").execute(message, [functions.getRandomSound("thanks", 3)]);
		} else {
			message.channel.send("", { files: [functions.getRandomSound("thanks", 3)] });
		}
	},
};