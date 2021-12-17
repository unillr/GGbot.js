const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('janken')
        .setDescription('じゃんけんができるよ！')
        .addUserOption(option =>
            option.setName('相手')
                .setDescription('じゃんけんをする相手')
                .setRequired(true),
        ),
    row: new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('hands')
                .setPlaceholder('出す手を選んでね！')
                .addOptions([
                    {
                        label: 'グー',
                        emoji: '✊',
                        value: '✊',
                    },
                    {
                        label: 'チョキ',
                        emoji: '✌',
                        value: '✌',
                    },
                    {
                        label: 'パー',
                        emoji: '🖐',
                        value: '🖐',
                    },
                ]),
        ),
    async execute(interaction) {
        const emojis = ['✊', '✌', '🖐'];

        const opponent = interaction.options.getUser('相手');

        const filter1 = i => i.member.id === interaction.member.id;
        const filter2 = i => i.member.id === opponent.id;

        const message = await interaction.reply({ content: `${interaction.member}`, components: [this.row], fetchReply: true });

        try {
            const hand1 = await message.awaitMessageComponent({ filter: filter1, componentType: 'SELECT_MENU', time: 30000 });
            await hand1.update({ content: `${opponent}` });

            const hand2 = await message.awaitMessageComponent({ filter: filter2, componentType: 'SELECT_MENU', time: 30000 });

            const judge = (emojis.indexOf(hand1.values[0]) - emojis.indexOf(hand2.values[0]) + 3) % 3;
            let result = `${hand1.member.displayName}${hand1.values[0]} vs. ${hand2.values[0]}${hand2.member.displayName}\n`;
            if (judge === 0) {
                result += '引き分け！';
            } else if (judge === 1) {
                result += `${hand2.member.displayName}の勝ち！`;
            } else {
                result += `${hand1.member.displayName}の勝ち！`;
            }
            await hand2.update({ content: result, components: [] });
        } catch (error) {
            await interaction.editReply({ content: '時間切れだよ！', components: [] });
        }
    },
};
