const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave-team')
        .setDescription('チームを抜けることができるよ!'),
    async execute(interaction) {
        const teamCategory = interaction.guild.channels.cache.get('949575751034875944');
        const teamChannels = [...teamCategory.children.values()]
            .filter(channel => channel.isText()
                && !channel.permissionsFor(interaction.guildId).has(Permissions.FLAGS.VIEW_CHANNEL)
                && channel.permissionsFor(interaction.member).has(Permissions.FLAGS.VIEW_CHANNEL)
                && !channel.permissionsFor(interaction.member).has(Permissions.FLAGS.MANAGE_CHANNELS));
        if (!teamChannels.length) {
            await interaction.reply({ content: 'チームに入っていないか、自分が作成したチームしかないよ!', ephemeral: true });
            return;
        }

        const selectMenuOptions = [];
        for (const channel of teamChannels) {
            selectMenuOptions.push({
                label: channel.name,
                value: channel.id,
            });
        }

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('leave')
                    .setPlaceholder('脱退するチームを選択')
                    .addOptions(selectMenuOptions),
            );

        await interaction.reply({ content: 'どのチームから脱退しますか?', components: [row], ephemeral: true });
    },
};
