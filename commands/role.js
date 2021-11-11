const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, DiscordAPIError } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('自分のロールを付け外しできるよ')
        .addRoleOption(option =>
            option.setName('ロール')
                .setDescription('付けたい/外したいロール')),
    async execute(interaction) {
        const role = interaction.options.getRole('ロール');

        if (!role) {
            const embed = new MessageEmbed().setTitle('ロールリスト');

            const categoryName = ['PC', 'Mobile', 'Console', 'Others'];
            const categoryColor = [0xff0000, 0x00ff00, 0x0000ff, 0xffffff];

            for (let i = 0; i < categoryName.length; i++) {
                const rolesName = interaction.guild.roles.cache
                    .filter(guildRole => guildRole.color === categoryColor[i])
                    .map(filteredRole => filteredRole.name);
                embed.addField(categoryName[i], rolesName.join('\n'), true);
            }

            await interaction.reply({ embeds: [embed] });

            return;
        }

        try {
            const roles = interaction.member.roles;

            if (roles.cache.some(MemberRole => role.equals(MemberRole))) {
                await roles.remove(role);
                await interaction.reply(`${role.name}を外したよ`);
            } else {
                await roles.add(role);
                await interaction.reply(`${role.name}を付けたよ`);
            }
        } catch (error) {
            if (error instanceof DiscordAPIError) {
                await interaction.reply({ content: `${role.name}は付け外しできないよ`, ephemeral: true });
            } else {
                console.error(error);
                await interaction.reply({ content: 'エラーがおこったよ', ephemeral: true });
            }
        }
    },
};
