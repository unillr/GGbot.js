const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, DiscordAPIError } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('自分のロールを付け外しできるよ!')
        .addRoleOption(option =>
            option.setName('ロール')
                .setDescription('付けたい[外したい]ロール')),
    async execute(interaction) {
        const role = interaction.options.getRole('ロール');

        if (!role) {
            const embed = new MessageEmbed().setTitle('ロールリスト');

            const categoryName = ['🖥️PC', '📱Mobile', '🎮Console', 'Others'];
            const categoryColor = [0xff0000, 0x00ff00, 0x0000ff, 0xffffff];

            for (let i = 0; i < categoryName.length; i++) {
                const rolesName = interaction.guild.roles.cache
                    .filter(guildRole => guildRole.color === categoryColor[i])
                    .map(filteredRole => filteredRole.name);
                embed.addField(categoryName[i], rolesName.join('\n'), true);
            }

            await interaction.reply({ embeds: [embed], ephemeral: true });

            return;
        }

        try {
            const member = interaction.member;

            if (member.roles.cache.some(memberRole => role.equals(memberRole))) {
                await member.roles.remove(role);
                await interaction.reply(`${member.displayName}が${role.name}から去ったよ!`);
            } else {
                await member.roles.add(role);
                await interaction.reply(`${member.displayName}が${role.name}の仲間になったよ!`);
            }
        } catch (error) {
            if (error instanceof DiscordAPIError) {
                await interaction.reply({ content: `${role.name}は付け外しできないよ!`, ephemeral: true });
            } else {
                throw error;
            }
        }
    },
};
