require('dotenv').config();

const {token} = process.env;

const {Client, Collection, GatewayIntentBits} = require('discord.js');

const fs = require('fs');

const client = new Client({intents: GatewayIntentBits.Guilds})

client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');

for (const folder of functionFolders) {
    const functionFile = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFile) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.handleCommands();
client.handleEvents();
client.handleComponents();
client.login(token)