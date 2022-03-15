const map = require('../commands/map');
const { setTimeout } = require('timers/promises');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'repick') return;

        const selectedMap = map.mapList[Math.floor(Math.random() * map.mapList.length)];
        const options = map.createOptions(selectedMap);

        try {
            await interaction.update(map.selecting);
            await setTimeout(3000);
            await interaction.editReply(options);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'エラーがおこったよ!', ephemeral: true });
        }
    },
};
