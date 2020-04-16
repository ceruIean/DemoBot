const discord = require("discord.js");

module.exports = {
	name: "info",
	aliases: ["track"],
	description: "Displays information about current audio.",
	category: "voice",
	usage: "",
	guildOnly: true,
	restricted: false,
	reaction: "",

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

		const messageEmbed = new discord.MessageEmbed()
			.setTitle("Now Playing")
			.setDescription(guildQueue.audioQueue[0].url ? `[${guildQueue.audioQueue[0].title}](${guildQueue.audioQueue[0].url})` : guildQueue.audioQueue[0].title);

		return message.channel.send(messageEmbed);
	},
};