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

	execute(message) {
		message.channel.send("", { files: [functions.getImage("ka_boom.png")] }).then(() => {
			message.client.commands.get("audio").execute(message, [ "ka_boom", 1 << 4 ]);
		});
	},
};