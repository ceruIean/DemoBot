const functions = require("../util/functions.js");

module.exports = {
	name: "freedom",
	aliases: [],
	description: "FREEEEDOOOM!",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,
	reaction: "💥",

	execute(message) {
		return message.client.commands.get("audio").execute(message, [ functions.getSound("freedom"), 1 << 4 ]);
	},
};