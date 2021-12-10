const map = require('../commands/map');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'repick') return;
        await map.execute(interaction);
    },
};
