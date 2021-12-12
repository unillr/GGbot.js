const map = require('../commands/map');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'repick') return;

        const filteredMaps = map.maps
            .filter(mapName => mapName.toUpperCase() !== interaction.message.embeds[0].title);

        const pickedMap = filteredMaps[Math.floor(Math.random() * filteredMaps.length)];
        const options = map.createReplyOptions(pickedMap);

        if (interaction.message.attachments.size > 4) {
            options.components[0].components[0].setDisabled(true);
        }

        try {
            await interaction.update(options);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'エラーがおこったよ!', ephemeral: true });
        }
    },
};
