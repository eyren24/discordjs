const fs = require('fs');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9')

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolder = fs.readdirSync('./src/commands');
        for (const folder of commandFolder) {
            const commandFile = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'));
            const {commands, commandArray} = client;
            for (const file of commandFile) {
                const command = require(`../../commands/${folder}/${file}`);
                await commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }
        console.log(`Commands:`);
        client.commandArray.forEach((name, button) => console.log(name.name))
        const clientID = '1104302544538325092'
        const guildID = '1217466183016644628'
        const rest = new REST({version: '9'}).setToken(process.env.token);
        try {
            console.log("Started resfreshing application (/) commands.");
            await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
                body: client.commandArray,
            })
            console.log("Successfully reloaded application (/) commands.")
        } catch (error) {
            console.log(error)
        }
    }
}