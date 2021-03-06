const fs = require("fs");
const ytdl = require("ytdl-core-discord");
const logger = require("../util/logger.js");

module.exports = {
	name: "play",
	aliases: ["p"],
	description: "Plays audio from an external source. (YouTube or remote file)",
	category: "voice",
	usage: "<url> [volume]",
	guildOnly: true,
	restricted: false,
	reaction: "▶️",

	async execute(message, args) {
		const guildQueue = message.client.guildMap.get(message.guild.id);
		const audio = {
			title: args[0],
			url: "",
			stream: "",
			type: "unknown",
			volume: args.length > 1 ? args[args.length - 1] || false : false,
		};

		if (!message.member.voice.channel) {
			message.channel.send("You must be in me same voice channel, mate!");
			return false;
		}

		if (args[0].match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g)) {
			logger.debug("Validating URL...");
			if (ytdl.validateURL(args[0])) {
				const ytdlOptions = {
					filter: "audioonly",
				};

				const info = await ytdl.getInfo(args[0], ytdlOptions);
				audio.title = info.title;
				audio.url = info.video_url;
				audio.stream = await ytdl(info.video_url, ytdlOptions);
				audio.type = "opus";
			}
			else {
				audio.url = audio.stream = args[0];
			}
		}
		else {
			const fileStream = fs.createReadStream(args[0]).on("error", error => {
				logger.error(error.message);
				message.channel.send("Where the bloody hell is that?");
				return false;
			});

			audio.stream = fileStream;
			audio.type = "ogg/opus";
		}

		if (audio.stream) {
			if (!guildQueue) {
				const guildSession = {
					textChannel: message.channel,
					voiceChannel: message.member.voice.channel,
					connection: null,
					dispatcher: null,
					audioQueue: [],
				};

				message.client.guildMap.set(message.guild.id, guildSession);
				guildSession.audioQueue.push(audio);

				guildSession.voiceChannel.join().then(connection => {
					logger.debug("Connection to voice chat established.");
					guildSession.connection = connection;
					this.playAudio(message, guildSession.audioQueue[0]);
				}).catch(error => {
					logger.error(error.message);
					guildSession.textChannel.send(`What just happened?\r\n${error.message}\r\nCheers!`);
					message.client.guildMap.delete(message.guild.id);
					return false;
				});
			}
			else {
				if (audio.url) {
					logger.debug(`Queued "${audio.title}"`);
					message.channel.send(`"${audio.title}" is comin' up, lad!`);
				}
				guildQueue.audioQueue.push(audio);
			}
		}
		else {
			return false;
		}
	},

	playAudio(message, audio) {
		const guildQueue = message.client.guildMap.get(message.guild.id);

		if (!audio || !audio.stream || audio.stream.ended || audio.stream.destroyed) {
			message.client.guildMap.delete(message.guild.id);
			guildQueue.voiceChannel.leave();
			return false;
		}

		const options = {
			highWaterMark: 1 << 6,
			type: audio.type,
		};

		if (!audio.volume) {
			options.volume = false;
		}

		guildQueue.dispatcher = guildQueue.connection.play(audio.stream, options)
			.on("finish", () => {
				logger.debug(`Finished playing "${audio.title}"`);
				guildQueue.audioQueue.shift();
				this.playAudio(message, guildQueue.audioQueue[0]);
			})
			.on("close", () => {
				logger.debug(`Stopped playing "${audio.title}"`);
				guildQueue.audioQueue.shift();
				this.playAudio(message, guildQueue.audioQueue[0]);
			})
			.on("error", error => {
				logger.error(error.message);
				guildQueue.textChannel.send(`What just happened?\r\n${error.message}\r\nCheers!`);
			});

		if (options.volume) {
			guildQueue.dispatcher.setVolumeLogarithmic((options.volume || 1) >> 1);
		}

		logger.debug(`Started playing "${audio.title}"`);
	},
};