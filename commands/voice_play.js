const fs = require("fs");
const ytdl = require("ytdl-core-discord");
const logger = require("../logger.js");

module.exports = {
	name: "play",
	aliases: ["p"],
	description: "I'll join your voice channel and sing ya something, lad!",
	category: "voice",
	usage: "<url> [volumeMultiplier]",
	guildOnly: true,
	restricted: false,
	reaction: "▶️",

	async execute(message, args) {
		const guildQueue = message.client.guildMap.get(message.guild.id);
		const audio = {
			title: args[0],
			url: "",
			location: "",
			volume: args[1] || false,
			type: "unknown",
		};

		if (!message.member.voice.channel) {
			message.channel.send("You must be in me same voice channel, mate!");
			return false;
		}

		if (ytdl.validateURL(args[0])) {
			const audioData = await ytdl.getInfo(args[0]);
			audio.title = audioData.title;
			audio.url = audioData.video_url;
			audio.location = await ytdl(audio.url, { filter: "audioonly" }).on("error", error => {
				logger.error(error.message);
				logger.error("porcodio");
			});
			audio.type = "opus";
			logger.info("Playing audio from YouTube.");
		}
		else if (!args[0].match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g)) {
			const stream = fs.createReadStream(args[0]).on("open", () => {
				audio.location = stream;
				audio.type = "ogg/opus";
				logger.info("Playing audio from local file.");
			}).on("error", error => {
				logger.error(error.message);
				message.channel.send("Where the bloody hell is that?");
				return false;
			});
		}
		else {
			audio.url = audio.location = args[0];
			logger.info("Playing audio from remote file.");
		}

		if (audio.location != null) {
			if (!guildQueue) {
				const guildSession = {
					textChannel: message.channel,
					voiceChannel: message.member.voice.channel,
					connection: null,
					audioQueue: [],
				};

				message.client.guildMap.set(message.guild.id, guildSession);
				guildSession.audioQueue.push(audio);

				guildSession.voiceChannel.join().then(connection => {
					guildSession.connection = connection;
					return this.play(message, guildSession.audioQueue[0]);
				}).catch(error => {
					logger.error(error);
					message.client.guildMap.delete(message.guild.id);
					return false;
				});
			}
			else {
				if (audio.url) {
					message.channel.send(`"${audio.title}" is comin' up, lad!`);
				}
				guildQueue.audioQueue.push(audio);
			}
		}
		else {
			return false;
		}
	},

	play(message, audio) {
		const guildQueue = message.client.guildMap.get(message.guild.id);

		if (!audio || !audio.location || audio.location.ended || audio.location.destroyed) {
			message.client.guildMap.delete(message.guild.id);
			guildQueue.voiceChannel.leave();
			return false;
		}

		try {
			guildQueue.connection.play(audio.location, { volume: audio.volume, type: audio.type, highWaterMark: 1 << 24 })
				.on("finish", () => {
					guildQueue.audioQueue.shift();
					this.play(message, guildQueue.audioQueue[0], audio.volume);
				})
				.on("close", () => {
					guildQueue.audioQueue.shift();
					this.play(message, guildQueue.audioQueue[0], audio.volume);
				})
				.on("error", error => {
					logger.error(error);
					logger.error("ALICE ALICE ALICECECEC ti amo tanto lo sai? si che lo sai <3");
				});
		}
		catch (error) {
			logger.error(error.message);
			logger.error("BRUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUH");
		}
	},
};