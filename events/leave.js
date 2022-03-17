module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isSelectMenu()) return;
        if (interaction.customId !== 'leave') return;

        const selectedTextChannel = interaction.guild.channels.cache.get(interaction.values[0]);
        const selectedVoiceChannel = interaction.guild.channels.cache.find(
            channel => channel.isVoice() && channel.name === selectedTextChannel.name,
        );

        try {
            selectedTextChannel.permissionOverwrites.delete(interaction.member.id);
            selectedVoiceChannel.permissionOverwrites.delete(interaction.member.id);

            await interaction.update({ content: `${selectedTextChannel.name}から脱退したよ!`, components:[] });
        } catch (error) {
            await interaction.update({ content: 'エラーが起こったよ!', components:[] });
        }
    },
};
