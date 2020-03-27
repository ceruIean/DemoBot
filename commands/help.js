const fs = require("fs");
const functions = require("../functions.js");
const Discord = require('discord.js');

module.exports = {
    name: "help",
    aliases: ["h", "list", "commands"],
    description: "Here's what you can ask me to do, lad.",
    category: "misc",
    usage: "",
    guildOnly: false,
    restricted: false,

    execute(message, args) {
        const commandList = [];
        fs.readdirSync("./commands").filter(file => file.endsWith(".js") && !file.includes(this.name)).forEach(file => {
            const command = require(`./${file}`);
            commandList.push(command);
        });

        const commandEmbed = new Discord.MessageEmbed()
            .attachFiles(functions.getImage("demoman_emblem"))
            .setColor("#FF4040")
            .setTitle("DemoBot Command List")
            .setThumbnail("attachment://demoman_emblem.png")
            .setDescription(this.description)
            .setTimestamp();

        commandEmbed.addField("\u200B", "\u200B");
        commandList.filter(command => !command.restricted).forEach(command => {
            let fieldTitle = command.usage ? `\`${message.client.prefix}${command.name}\`  \`${command.usage}\`` : `\`${message.client.prefix}${command.name}\``;
            commandEmbed.addField(fieldTitle, command.description, false);
        });

        if (message.client.owners.includes(message.author.id)) {
            commandEmbed.addField("\u200B", "Restricted commands:");
            commandList.filter(command => command.restricted).forEach(command => {
                let fieldTitle = command.usage ? `\`${message.client.prefix}${command.name}\`  \`${command.usage}\`` : `\`${message.client.prefix}${command.name}\``;
                commandEmbed.addField(fieldTitle, command.description, false);
            });
        }

        message.channel.send(commandEmbed);
    }
}