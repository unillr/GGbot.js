const map = require('../commands/map');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'repick') return;

        try {
            await map.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'エラーがおこったよ!', ephemeral: true });
        }
    },
};
