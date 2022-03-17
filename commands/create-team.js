const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-team')
        .setDescription('チームを作成するよ!')
        .addStringOption(option =>
            option.setName('チーム名')
                .setDescription('作るチームの名前')
                .setRequired(true)),

    async execute(interaction) {
        const teamName = interaction.options.getString('チーム名').toLowerCase().replace(' ', '-');
        const teamCategory = interaction.guild.channels.cache.get('949575751034875944');

        if (teamCategory.children.some(channel => channel.name === teamName)) {
            await interaction.reply({ content: 'その名前のチームはもうあるよ!', ephemeral: true });
            return;
        }

        teamCategory.createChannel(teamName, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: interaction.guildId,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                    id: interaction.member.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.MANAGE_MESSAGES],
                },
                {
                    id: interaction.client.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL],
                },
            ],
        });

        teamCategory.createChannel(teamName, {
            type: 'GUILD_VOICE',
            permissionOverwrites: [
                {
                    id: interaction.guildId,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.CONNECT],
                },
                {
                    id: interaction.member.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.CONNECT, Permissions.FLAGS.MANAGE_CHANNELS],
                },
                {
                    id: interaction.client.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.CONNECT],
                },
            ],
        });

        await interaction.reply({ content: `${teamName}を作成したよ!`, ephemeral: true });
    },
};
