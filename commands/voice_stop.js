module.exports = {
	name: "stop",
	aliases: ["s", "leave"],
	description: "Stops playing audio from voicechat and leaves the channel.",
	category: "voice",
	usage: "",
	guildOnly: true,
	restricted: false,
	reaction: "⏹️",

	execute(message, args) {
		const guildQueue = message.client.botQueue.get(message.guild.id);

		if (!guildQueue || !guildQueue.connection || !guildQueue.connection.dispatcher) {
            message.channel.send("I might be drunk, but I'm not doing anything boyo!");
            return;
		}

		if (!message.member.voice.channel) {
            message.channel.send("Ye need to be in me same voice channel, lad!");
            return;
		}
		
		guildQueue.songs = [];
		guildQueue.connection.dispatcher.destroy();
		return true;
	},
};