const role = require('../commands/role');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'hide') return;

        const memberRoleIds = [...interaction.member.roles.cache.values()]
            .map(memberRole => memberRole.id);
        const filteredRoles = interaction.guild.roles.cache
            .filter(guildRole => !memberRoleIds.includes(guildRole.id));
        const embed = role.createRoleList(filteredRoles);

        try {
            await interaction.update({ embeds: [embed], components: [] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'エラーがおこったよ!', ephemeral: true });
        }
    },
};
