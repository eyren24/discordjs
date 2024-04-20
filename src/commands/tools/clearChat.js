const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearchat')
        .setDescription('Clear current chat'),
    async execute(interaction, client) {
        await interaction.reply('Ok, cancello tutti imessaggi della chat corrente.')
        const channel = client.channels.cache.get(interaction.channelId);
        const messages = await channel.messages.fetch();

        const today = new Date();
        for (const msg of messages) {
            const msgDate = new Date(msg[1].createdTimestamp);
            const currentDate = new Date();
            const timeDifference = currentDate - msgDate;
            const millisecondsIn14Days = 14 * 24 * 60 * 60 * 1000;

            if (timeDifference < millisecondsIn14Days) {
                channel.messages.delete(msg[0])
            } else {
                channel.messages.delete(msg[0])
            }
        }
    }
}