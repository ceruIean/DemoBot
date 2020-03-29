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

	execute(message, args) {
		if (message.member && message.member.voice.channel) {
			message.client.commands.get("play").execute(message, [functions.randomSound("jeers", 8)]);
		} else {
			message.channel.send("", { files: [functions.randomSound("jeers", 8)] });
		}
	},
};