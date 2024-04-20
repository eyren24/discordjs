module.exports = {
    data: {
        name: "sub-twitch",
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: "https://twitch.tv/eyren24/",
        });
    }
}