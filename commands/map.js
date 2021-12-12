const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageButton, MessageAttachment } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('VALORANTのMAPをランダムに選ぶよ！'),
    maps: ['Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Split'],
    createReplyOptions: mapName => ({
        files: [new MessageAttachment()
            .setFile(`./images/maps/${mapName}.png`, `${mapName}.png`)],
        embeds: [new MessageEmbed()
            .setTitle(mapName.toUpperCase())
            .setImage(`attachment://${mapName}.png`)
            .setColor('#fa4454')],
        components: [new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('repick')
                    .setLabel('選び直す')
                    .setStyle('PRIMARY'),
            )],
    }),

    async execute(interaction) {
        const pickedMap = this.maps[Math.floor(Math.random() * this.maps.length)];
        const options = this.createReplyOptions(pickedMap);

        await interaction.reply(options);
    },
};
