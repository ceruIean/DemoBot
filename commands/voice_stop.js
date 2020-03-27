module.exports = {
	name: "stop",
	aliases: ["s", "leave"],
	description: "Stops playing audio from voicechat and leaves the channel.",
	category: "voice",
	usage: "",
	guildOnly: true,
	restricted: false,

	execute(message, args) {
		const guildQueue = message.client.botQueue.get(message.guild.id);

		if (!guildQueue) {
			return message.channel.send("I might be drunk, but I'm not doing anything, lad!");
		}

		if (!message.member.voice.channel) {
			return message.channel.send("You need to be in me same voice channel, lad!");
		}

		if (guildQueue.connection && guildQueue.connection.dispatcher) {
			guildQueue.songs = [];
			guildQueue.connection.dispatcher.end();
		}
	},
};