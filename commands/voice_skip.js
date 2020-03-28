module.exports = {
    name: "skip",
    aliases: ["next"],
    description: "Skips the current audio being played in voicechat.",
    category: "voice",
    usage: "",
    guildOnly: true,
    restricted: false,

    execute(message, args) {
        const guildQueue = message.client.botQueue.get(message.guild.id);

		if (!guildQueue) {
			return message.channel.send("I might be drunk, but I'm not doing anything boyo!");
		}

		if (!message.member.voice.channel) {
			return message.channel.send("Ye need to be in me same voice channel, lad!");
        }
        
        if (guildQueue.connection && guildQueue.connection.dispatcher) {
			guildQueue.connection.dispatcher.end();
		}
    }
}