const fs = require("fs");
const functions = require("../util/functions.js");
const discord = require("discord.js");

module.exports = {
	name: "help",
	aliases: ["h", "list", "commands"],
	description: "Here's what you can ask me to do, lad.",
	category: "",
	usage: "",
	guildOnly: false,
	restricted: false,
	reaction: "",

	execute(message) {
		const commandList = [];
		const commandCategories = [ "" ];

		fs.readdirSync("./commands").filter(file => file.endsWith(".js") && !file.includes(this.name)).forEach(file => {
			const command = require(`./${file}`);
			commandList.push(command);
			commandCategories.push(command.category);
		});

		const messageEmbed = new discord.MessageEmbed()
			.attachFiles(functions.getImage("demoman_emblem.png"))
			.setColor("#FF4040")
			.setTitle("💥 DemoBot Command List 💥")
			.setThumbnail("attachment://demoman_emblem.png")
			.setDescription(this.description)
			.setTimestamp();

		for (let i = 1; i < commandCategories.length; i++) {
			const command = commandList[i - 1];
			if (!command.restricted || (command.restricted && message.client.admins.includes(message.author.id))) {
				if (commandCategories[i - 1] != commandCategories[i]) {
					messageEmbed.addField("\u200B", `${commandCategories[i].charAt(0).toUpperCase()}${commandCategories[i].slice(1).toLowerCase()} commands:`);
				}

				const fieldTitle = command.usage ? `\`${message.client.prefix}${command.name}\`  \`${command.usage}\`` : `\`${message.client.prefix}${command.name}\``;
				messageEmbed.addField(fieldTitle, command.description, false);
			}
		}

		message.channel.send("I've just sent you what you'll need, lad!");
		return message.author.send(messageEmbed);
	},
};