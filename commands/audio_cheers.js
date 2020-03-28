const functions = require("../functions.js");

module.exports = {
	name: "cheers",
	aliases: ["good"],
	description: "A loud shout of approval or encouragement.",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,

	execute(message, args) {
		if (message.member && message.member.voice.channel) {
			message.client.commands.get("play").execute(message, [functions.randomSound("cheers", 8)]);
		} else {
			message.channel.send("", { files: [functions.randomSound("cheers", 8)] });
		}
	},
};