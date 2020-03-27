const functions = require("../functions.js");

module.exports = {
    name: "uwu",
    aliases: [],
    description: "uwu",
    category: "audio",
    usage: "",
    guildOnly: false,
    restricted: true,

    execute(message, args) {
        if (message.member && message.member.voice.channel) {
            message.client.commands.get("play").execute(message, [functions.getSound("uwu"), 50]);
        }

        message.channel.send("uwu", { files: [functions.getSound("uwu")] });
    },
};