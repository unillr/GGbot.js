const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Permissions } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setType(2)
        .setName('チームに招待'),

    async execute(interaction) {
        const teamCategory = interaction.guild.channels.cache.get('949575751034875944');
        const teamChannels = [...teamCategory.children.values()]
            .filter(channel => channel.isText())
            .filter(channel => channel.permissionsFor(interaction.member).has(Permissions.FLAGS.MANAGE_CHANNELS));
        const selectMenuOptions = [];
        for (const channel of teamChannels) {
            selectMenuOptions.push({
                label: channel.name,
                value: `${interaction.targetId},${channel.id}`,
            });
        }

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('invite')
                    .setPlaceholder('招待するチームを選択')
                    .addOptions(selectMenuOptions),
            );

        await interaction.reply({ content: `${interaction.targetMember}をどのチームに招待しますか?`, components: [row], ephemeral: true });
    },
};
