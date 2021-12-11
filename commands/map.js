const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('VALORANTのMAPをランダムに選ぶよ！'),
    async execute(interaction) {
        const mapNames = ['Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Split'];
        const pickedMapName = mapNames[Math.floor(Math.random() * mapNames.length)];

        const attachment = new MessageAttachment()
            .setFile(`./images/maps/${pickedMapName}.png`, `${pickedMapName}.png`);

        const embed = new MessageEmbed()
            .setTitle(pickedMapName.toUpperCase())
            .setImage(`attachment://${pickedMapName}.png`)
            .setColor('#fa4454');

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('repick')
                    .setLabel('選び直す')
                    .setStyle('PRIMARY'),
            );

        if (interaction.customId === 'repick') {
            await interaction.update({
                files: [attachment],
                embeds: [embed],
                components: [row],
            });
        } else {
            await interaction.reply({
                files: [attachment],
                embeds: [embed],
                components: [row],
            });
        }
    },
};
