const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, DiscordAPIError, Collection, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('自分のロールを付け外しできるよ!')
        .addRoleOption(option =>
            option.setName('ロール')
                .setDescription('付けたい[外したい]ロール')),

    category: new Collection([[0xff0000, '🖥️PC'], [0x00ff00, '📱Mobile'], [0x0000ff, '🎮Console'], [0xffffff, 'Others']]),

    row: new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('hide')
                .setLabel('自分のロールを隠す')
                .setStyle('PRIMARY'),
        ),

    createRoleList(guildRoles) {
        const roleListEmbed = new MessageEmbed().setTitle('ロールリスト');

        for (let i = 0; i < this.category.size; i++) {
            const roleList = guildRoles
                .filter(guildRole => guildRole.color === this.category.keyAt(i))
                .map(categorizedRole => categorizedRole.name);

            roleListEmbed.addField(this.category.at(i), roleList.join('\n'), true);
        }

        return roleListEmbed;
    },

    async execute(interaction) {
        const gottenRole = interaction.options.getRole('ロール');

        if (!gottenRole) {
            const embed = this.createRoleList(interaction.guild.roles.cache);
            await interaction.reply({ embeds: [embed], components: [this.row], ephemeral: true });
            return;
        }

        try {
            const member = interaction.member;

            if (member.roles.cache.some(memberRole => memberRole.id === gottenRole.id)) {
                await member.roles.remove(gottenRole);
                await interaction.reply(`${member.displayName}が${gottenRole.name}から去ったよ!`);
            } else {
                await member.roles.add(gottenRole);
                await interaction.reply(`${member.displayName}が${gottenRole.name}の仲間になったよ!`);
            }
        } catch (error) {
            if (error instanceof DiscordAPIError) {
                await interaction.reply({ content: `${gottenRole.name}は付け外しできないよ!`, ephemeral: true });
            } else {
                throw error;
            }
        }
    },
};
