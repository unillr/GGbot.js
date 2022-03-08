const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('指定した人をチームに招待できるよ!')
        .addUserOption(option =>
            option.setName('メンバー')
                .setDescription('チームに招待するメンバー')
                .setRequired(true),
        ),

    async execute(interaction) {
        const newMember = interaction.options.getUser('メンバー');
        const teamCategory = interaction.guild.channels.cache.get('949575751034875944');
        const teamChannels = [...teamCategory.children.values()]
            .filter(channel => channel.isText())
            .filter(channel => channel.permissionsFor(interaction.member).has(Permissions.FLAGS.MANAGE_CHANNELS));
        if (!teamChannels.length) {
            await interaction.reply({ content: '招待可能なチームがないよ!', ephemeral: true });
            return;
        }

        const selectMenuOptions = [];
        for (const channel of teamChannels) {
            selectMenuOptions.push({
                label: channel.name,
                value: `${newMember.id},${channel.id}`,
            });
        }

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('invite')
                    .setPlaceholder('招待するチームを選択')
                    .addOptions(selectMenuOptions),
            );

        await interaction.reply({ content: `${newMember}をどのチームに招待しますか?`, components: [row], ephemeral: true });
    },
};
