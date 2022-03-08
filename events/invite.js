module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isSelectMenu()) return;
        if (interaction.customId !== 'invite') return;

        const [targetMemberId, selectedTextChannelId] = interaction.values[0].split(',');
        const selectedTextChannel = interaction.guild.channels.cache.get(selectedTextChannelId);
        const selectedVoiceChannel = interaction.guild.channels.cache.find(
            channel => channel.isVoice() && channel.name === selectedTextChannel.name,
        );
        const targetMember = interaction.guild.members.cache.get(targetMemberId);

        try {
            selectedTextChannel.permissionOverwrites.edit(targetMemberId, { VIEW_CHANNEL: true });
            selectedVoiceChannel.permissionOverwrites.edit(targetMemberId, { VIEW_CHANNEL: true, CONNECT: true });

            await interaction.update({ content: `${targetMember}を${selectedTextChannel}に招待したよ!`, components:[] });
        } catch (error) {
            await interaction.update({ content: 'エラーが起こったよ!', components:[] });
        }
    },
};
