const functions = require("../functions.js");

module.exports = {
	name: "uwu",
	aliases: [],
	description: "uwu",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: true,
	reaction: "",

	execute(message) {
		if (message.member && message.member.voice.channel) {
			message.client.commands.get("play").execute(message, [functions.getSound("uwu"), 1 << 4]);
		}

		message.channel.send("", { files: [functions.getSound("uwu")] });
	},
};