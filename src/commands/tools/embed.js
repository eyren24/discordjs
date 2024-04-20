const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twitch')
        .setDescription('Follow on my twitch.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of channel to check')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('link1')
                .setDescription('Link for instagram')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('link2')
                .setDescription('Link for youtube')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const channelName = interaction.options._hoistedOptions[0].value;
        const link1 = interaction.options._hoistedOptions[1].value;
        const link2 = interaction.options._hoistedOptions[2].value;
        const twitch = require('../../twitch/twitchAPI.js')
        const response = await twitch(channelName)
        const channel = response.data[0];
        if (!channel){
            await interaction.reply('Canale twitch non trovato!')
            return;
        }
        const embed = new EmbedBuilder()
            .setTitle(`Seguimi anche su twitch! @${channel.login}`)
            .setDescription(checkIfDesc(channel.description))
            .setColor(0x18e1ee)
            .setImage(checkProfileImage(channel.offline_image_url) ? channel.profile_image_url : channel.offline_image_url)
            .setTimestamp(Date.now())
            .setAuthor({
                url: `https://twitch.tv/${channel.login}`,
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.tag
            })
            .setFooter({
                iconURL: interaction.user.displayAvatarURL(),
                text: client.user.tag
            })
            .setURL(`https://twitch.tv/eyren24/`)
            .addFields(
                {
                    name: `Instagram`,
                    value: link1,
                    inline: false,
                },
                {
                    name: `Youtube`,
                    value: link2,
                    inline: false,
                }
            );
        await interaction.reply({
            embeds: [embed]
        })
    }
}
const checkIfDesc = (description) => {
    if (description.length === 0) {
        return null;
    } else {
        return description;
    }
}
const checkProfileImage = (image) => {
    return image.length === 0;
}