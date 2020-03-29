const fs = require("fs");
const ytdl = require("ytdl-core-discord");
const functions = require("../functions.js");
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
		try {
			const botQueue = message.client.botQueue;
			const currentSession = botQueue.get(message.guild.id);
			const voiceChannel = message.member.voice.channel;

			if (!voiceChannel) {
				message.channel.send("You must be in me same voice channel, mate!");
				return;
			}

			let audio = {
				title: args[0],
				url: "",
				location: args[0],
				volume: args[1] || false,
			};

			if (ytdl.validateURL(args[0])) {
				const audioData = await ytdl.getInfo(args[0]);
				audio.title = audioData.title;
				audio.url = audioData.video_url;
				audio.location = await ytdl(audio.url, { filter: "audioonly" });
			}
			else if (!args[0].includes("http")) {
				audio.location = fs.createReadStream(args[0])
					.on("error", () => {
						audio.location = fs.createReadStream(functions.getSound(args[0]))
							.on("error", () => {
								audio = false;
								message.channel.send("Where the bloody hell is that?");
								return;
							});
					});
			}

			if (!currentSession) {
				const guildQueue = {
					textChannel: message.channel,
					voiceChannel: voiceChannel,
					connection: null,
					songs: [],
				};

				botQueue.set(message.guild.id, guildQueue);
				guildQueue.songs.push(audio);

				voiceChannel.join().then(connection => {
					guildQueue.connection = connection;
					this.play(message, guildQueue.songs[0]);
				}).catch(error => {
					logger.error(error);
					botQueue.delete(message.guild.id);
					return;
				});
			}
			else {
				if (ytdl.validateURL(args[0])) {
					message.channel.send(`"${audio.title}" is comin' up, lad!`);
				}

				currentSession.songs.push(audio);
			}
		}
		catch (error) {
			logger.error(error);
			message.channel.send(error.message);
		}
	},

	play(message, audio) {
		const botQueue = message.client.botQueue;
		const guildQueue = botQueue.get(message.guild.id);

		if (!audio || audio.location.ended || audio.location.destroyed) {
			guildQueue.voiceChannel.leave();
			botQueue.delete(message.guild.id);
			return;
		}

		const streamType = ytdl.validateURL(audio.url) ? "opus" : !audio.title.includes("http") ? "ogg/opus" : "unknown";
		guildQueue.connection.play(audio.location, { type: streamType, highWaterMark: 1 << 24, volume: audio.volume })
			.on("finish", () => {
				guildQueue.songs.shift();
				this.play(message, guildQueue.songs[0], audio.volume);
			})
			.on("close", () => {
				guildQueue.songs.shift();
				this.play(message, guildQueue.songs[0], audio.volume);
			})
			.on("error", error => {
				logger.error(error);
			});

		logger.info(`[${message.guild.name} / ${guildQueue.voiceChannel.name}] Currently playing: "${audio.title}" (volume: ${audio.volume})`);
		// dispatcher.setVolumeLogarithmic(audio.volume);
	},
};