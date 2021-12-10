const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('map')
        .setDescription('ランダムにMAPを返すよ！'),
    async execute(interaction) {
        const mapNames = ['ASCENT', 'BIND', 'FRACTURE', 'HAVEN', 'ICEBOX', 'SPLIT'];
        const pickedMapName = mapNames[Math.floor(Math.random() * mapNames.length)];
        await interaction.reply(pickedMapName);
    },
};
