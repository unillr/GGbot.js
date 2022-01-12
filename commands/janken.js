const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, Collection } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('janken')
        .setDescription('じゃんけんができるよ！')
        .addUserOption(option =>
            option.setName('相手')
                .setDescription('じゃんけんをする相手')
                .setRequired(true),
        ),

    hands: new Collection(['グー', '✊'], ['チョキ', '✌'], ['パー', '🖐']),

    createHandOptions() {
        const handOptions = [];
        for (let i = 0; i < this.hands.size; i++) {
            handOptions.push({
                lebel: this.hands.keyAt(i),
                emoji: this.hands.at(i),
                value: this.hands.at(i),
            });
        }
        return handOptions;
    },

    row: new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('hands')
                .setPlaceholder('出す手を選んでね！')
                .addOptions(this.createHandOptions()),
        ),

    async execute(interaction) {
        const opponent = interaction.options.getUser('相手');

        const message = await interaction.reply({ content: `${interaction.member}`, components: [this.row], fetchReply: true });
        try {
            const isSender = i => i.member.id === interaction.member.id;
            const senderHand = await message.awaitMessageComponent({ filter: isSender, componentType: 'SELECT_MENU', time: 30000 });
            await senderHand.update({ content: `${opponent}` });

            const isOpponent = i => i.member.id === opponent.id;
            const opponentHand = await message.awaitMessageComponent({ filter: isOpponent, componentType: 'SELECT_MENU', time: 30000 });

            const handEmojis = [...this.hands.values()];
            const judge = (handEmojis.indexOf(senderHand.values[0]) - handEmojis.indexOf(opponentHand.values[0]) + 3) % 3;

            let result = `${senderHand.member.displayName}${senderHand.values[0]} vs. ${opponentHand.values[0]}${opponentHand.member.displayName}\n`;

            if (judge === 0) {
                result += '引き分け！';
            } else if (judge === 1) {
                result += `${opponentHand.member.displayName}の勝ち！`;
            } else {
                result += `${senderHand.member.displayName}の勝ち！`;
            }

            await opponentHand.update({ content: result, components: [] });
        } catch (error) {
            await interaction.editReply({ content: '時間切れだよ！', components: [] });
        }
    },
};
