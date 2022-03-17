const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('team')
        .setDescription('チームに関する操作ができるよ!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('チームを作ることができるよ!')
                .addStringOption(option =>
                    option.setName('チーム名')
                        .setDescription('作るチームの名前')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('invite')
                .setDescription('指定した人をチームに招待できるよ!')
                .addUserOption(option =>
                    option.setName('メンバー')
                        .setDescription('チームに招待するメンバー')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('kick')
                .setDescription('指定した人をチームからキックできるよ!')
                .addUserOption(option =>
                    option.setName('メンバー')
                        .setDescription('チームからキックするメンバー')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('leave')
                .setDescription('チームを抜けることができるよ!')),
};
