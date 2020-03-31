module.exports = {
	name: "freedom",
	aliases: [],
	description: "FREEEEDOOOM!",
	category: "audio",
	usage: "",
	guildOnly: false,
	restricted: false,
	reaction: "",

	execute(message) {
		message.client.commands.get("audio").execute(message, [ "freedom", 1 << 4 ]);
	},
};