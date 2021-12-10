const { SlashCommandBuilder, bold } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('ランダムにMAPを返すよ！'),
    async execute(interaction) {
        const mapNames = ['Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Split'];
        const pickedMapName = mapNames[Math.floor(Math.random() * mapNames.length)];

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('repick')
                    .setLabel('もういちど選ぶ')
                    .setEmoji('🔁')
                    .setStyle('PRIMARY'),
            );

        await interaction.reply({
            content: bold(pickedMapName.toUpperCase()),
            files: [`./images/maps/${pickedMapName}.png`],
            components: [row],
        });
    },
};
