const functions = require("../functions.js");

module.exports = {
	name: "audio",
	aliases: ["a"],
	description: "ssssssssssssssssssssssss",
	category: "admin",
	usage: "<name> [volume]",
	guildOnly: false,
	restricted: true,
	reaction: "",

	execute(message, args) {
		const soundName = args[0];
		const volume = args[1] || 1;
		if (message.member && message.member.voice.channel) {
			message.client.commands.get("play").execute(message, [functions.getSound(soundName), volume]);
		}
		else {
			message.channel.send("", { files: [functions.getSound(soundName)] });
		}
	},
};