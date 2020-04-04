const fileSystem = require("fs");
const discord = require("discord.js");
const logger = require("./util/logger.js");

module.exports = class extends discord.Client {
	constructor(config) {
		super({});
		const flag = !config;

		if (!config) {
			logger.debug("Constructing client...");

			if (process.env.NODE_ENV !== "production") {
				require("dotenv-flow").config();
			}

			this.commands = new discord.Collection();
			this.cooldowns = new discord.Collection();
			this.guildMap = new Map();

			try {
				logger.debug("Reading config file...");
				config = JSON.parse(fileSystem.readFileSync("./config.json"));
				fileSystem.readdirSync("./commands").filter(file => file.endsWith(".js")).forEach(file => {
					const command = require(`./commands/${file}`);
					this.commands.set(command.name, command);
				});
			}
			catch (error) {
				logger.error(error.message);
			}
		}
		else {
			logger.debug("Reconstructing client...");
		}

		this.admins = config.admins;
		this.prefix = config.prefix;

		if (!flag) {
			try {
				logger.debug("Writing config file...");
				fileSystem.writeFileSync("./config.json", JSON.stringify(config, null, 4));
			}
			catch (error) {
				logger.error(error.message);
			}
		}

		logger.debug("Done!\r\n");
	}
};