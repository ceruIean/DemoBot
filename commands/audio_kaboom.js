const functions = require("../functions.js");

module.exports = {
	name: "kaboom",
	aliases: [],
	description: "ka boom",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,
	reaction: "💥",

	execute(message, args) {
		if (message.member && message.member.voice.channel) {
			message.client.commands.get("play").execute(message, [functions.getSound("ka_boom"), 1 << 4]);
		}
		
		message.channel.send("", { files: [functions.getImage("ka_boom.gif")] });
	},
};