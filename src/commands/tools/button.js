const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Return a button!'),
    async execute(interaction, client) {
        const button = new ButtonBuilder()
            .setCustomId('sub-twitch')
            .setLabel(`Click me!`)
            .setStyle(ButtonStyle.Success);
        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(button)]
        })
    }
}