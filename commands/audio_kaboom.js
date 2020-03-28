const functions = require("../functions.js");

module.exports = {
	name: "kaboom",
	aliases: [],
	description: "ka boom",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,

	execute(message, args) {
		if (message.member && message.member.voice.channel) {
			message.client.commands.get("play").execute(message, [functions.getSound("ka_boom"), "50"]);
		} else {
			message.channel.send("ka boom", { files: [functions.getSound("ka_boom")] });
		}
	},
};