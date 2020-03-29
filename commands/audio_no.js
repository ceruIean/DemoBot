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
		if (message.member && message.member.voice.channel) {
			message.client.commands.get("play").execute(message, [functions.randomSound("no", 3)]);
		}
		else {
			message.channel.send("", { files: [functions.randomSound("no", 3)] });
		}
	},
};