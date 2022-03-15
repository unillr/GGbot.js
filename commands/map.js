const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js');
const { setTimeout } = require('timers/promises');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('VALORANTのMAPをランダムに選ぶよ!'),

    mapList: ['Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Split'],

    selecting: {
        files: ['./images/maps/maps.gif'],
        embeds: [new MessageEmbed()
            .setTitle('Selecting Map')
            .setImage('attachment://maps.gif'),
        ],
        components: [new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('repick')
                    .setLabel('選び直す')
                    .setStyle('PRIMARY')
                    .setDisabled(true),
            )],
    },

    createOptions: mapName => ({
        files: [{
            attachment: `./images/maps/${mapName}.png`,
            // attachment: 'https://avatars.githubusercontent.com/u/55926286',
            name: `${mapName}.png`,
        }],
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
        const selectedMap = this.mapList[Math.floor(Math.random() * this.mapList.length)];
        const options = this.createOptions(selectedMap);

        await interaction.reply(this.selecting);
        await setTimeout(3000);
        await interaction.editReply(options);
    },
};
