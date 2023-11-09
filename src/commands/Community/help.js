const { SlashCommandBuilder, EmbedBuilder}=require('discord.js');
const pfp = require('../../botpfp.json')

module.exports={
    data: new SlashCommandBuilder()
    .setName('help-guide')
    .setDescription('Shows a list of commands that can be executed via the bot'), 
    async execute (interaction){

        const embed = new EmbedBuilder()
        .setTimestamp()
        .setThumbnail(`${pfp}`)
        .setTitle('> Help Guide')
        .setAuthor({ name: '🎶 Sainte - Help Guide'})
        .setFooter({ text: '🎶 Command Tracker | By Kkermit'})
        .addFields({ name: "• /pong ", value: "> Replys with pong."})
        .addFields({ name: "• /bot-info", value: "> Displays information about the bot."})
        .addFields({ name: "• /bot-website", value: "> Shows users the support website for the bot."})
        .addFields({ name: "• /help-guide", value: "> Displays this help menu."})
        .addFields({ name: "• /bot-stats", value: "> Displays the bots statisitcs."})
        .addFields({ name: "• /bots-specs", value: "> Displays the specs that the bot uses."})
        .addFields({ name: "• /bot-ping", value: "> Displays the connection of the bot and your client."})
        .addFields({ name: "• /bot-online", value: "> Shows that the bot is online."})
        .addFields({ name: "• /music play", value: "> Plays a given song or YouTube URL in a voice channel."})
        .addFields({ name: "• /music options queue", value: "> Displays the active queue."})
        .addFields({ name: "• /music options skip", value: "> Skips the current song being played."})
        .addFields({ name: "• /music options pause", value: "> Pauses the current song being played."})
        .addFields({ name: "• /music options resume", value: "> Unpauses the current paused song."})
        .addFields({ name: "• /music options stop", value: "> Disconnects the bot from the voice channel."})
        .addFields({ name: "• /music volume ", value: "> Changes the volume of the bot for everyone."})
        .setColor("Red")

        await interaction.reply({ embeds: [embed]});
    }
}