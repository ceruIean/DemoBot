module.exports = {
    name: "reload",
    aliases: ["r"],
    description: "Reloads a command for debugging purposes.",
    category: "misc",
    usage: "<command>",
    guildOnly: false,
    restricted: true,

    execute(message, args) {
        const commandName = args[0].toLowerCase();
        delete require.cache[require.resolve(`./${commandName}.js`)];

        try {
            const reloadedCommand = require(`./${commandName}.js`);
            message.client.commands.set(reloadedCommand.name, reloadedCommand);
        } catch (error) {
            return console.log(error);
        }
    }
}