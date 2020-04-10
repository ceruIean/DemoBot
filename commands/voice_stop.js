module.exports = {
	name: "stop",
	aliases: ["st", "leave"],
	description: "Stops playing audio and leaves the channel.",
	category: "voice",
	usage: "",
	guildOnly: true,
	restricted: false,
	reaction: "⏹️",

	execute(message) {
		const guildQueue = message.client.guildMap.get(message.guild.id);

		if (!guildQueue || !guildQueue.connection || !guildQueue.connection.dispatcher) {
			message.channel.send("I might be drunk, but I'm not doing anything boyo!");
			return false;
		}

		if (!message.member.voice.channel) {
			message.channel.send("Ye need to be in me same voice channel, lad!");
			return false;
		}

		guildQueue.songs = [];
		return guildQueue.connection.dispatcher.destroy();
	},
};