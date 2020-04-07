module.exports = {
	name: "audio",
	aliases: ["a"],
	description: "Plays audio from a local source.",
	category: "admin",
	usage: "<name> [volume]",
	guildOnly: false,
	restricted: true,
	reaction: "🎵",

	execute(message, args) {
		const soundName = args[0];
		const volume = args[1] || false;

		if (message.member && message.member.voice.channel) {
			return message.client.commands.get("play").execute(message, [soundName, volume]);
		}

		return message.channel.send("", { files: [soundName] });
	},
};