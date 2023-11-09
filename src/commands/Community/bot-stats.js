const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed } = require('discord.js');
const { performance } = require('perf_hooks');
const os = require('os');
const pfp = require("../../botpfp.json")
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('bot')
    .setDescription(`Shows YourBot's information.`)
    .addSubcommand(command => command.setName('stats').setDescription('Shows some basic statistics about YourBot.'))
    .addSubcommand(command => command.setName('specs').setDescription('Shows the specifications that YourBot uses.'))
    .addSubcommand(command => command.setName('ping').setDescription(`Displays the bot's ping... Pong.. PANG!!`))
    .addSubcommand(command => command.setName('online').setDescription(`Shows the online status of YourBot, a great way to see if our bot works!`)),
    async execute(interaction, client) {
 
        const sub = interaction.options.getSubcommand();
 
        switch (sub) {
 
        case 'stats':
 
        let servercount = await client.guilds.cache.reduce((a,b) => a+b.memberCount, 0);
 
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
 
        let uptime = `**${days}**d **${hours}**h **${minutes}**m **${seconds}**s`;
 
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Support Server')
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.gg/xcMVwAVjSD"),
 
            new ButtonBuilder()
            .setLabel('Bot Invite')
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.com/api/oauth2/authorize?client_id=1100082786049740901&permissions=8&scope=applications.commands%20bot")
        )
 
        const embed = new EmbedBuilder()
        .setColor("Purple")
        .setTitle(`> Bot's Statistics`)
        .setAuthor({ name: '🤖 Bot Statistics Tool'})
        .setFooter({ text: `🤖 Bot's statistics`})
        .setThumbnail(`${pfp}`)
        .setTimestamp()
        .addFields({ name: '• Servers Count', value: `> ${client.guilds.cache.size}`, inline: true})
        .addFields({ name: '• Members Count', value: `> ${servercount}`, inline: true})
        .addFields({ name: '• Latency', value: `> ${Math.round(client.ws.ping)}ms`, inline: false})
        .addFields({ name: '• Uptime', value: `> ${uptime}`, inline: false})
 
        await interaction.reply({ embeds: [embed], components: [button] })
 
        break;
        case 'specs':
 
        const usage2 = process.memoryUsage();
        const usage = process.cpuUsage();
        const usagePercent = usage.system / usage.user * 100;
        const usagePercent2 = usage2.system / usage2.user * 100;
        const memoryUsed = (os.totalmem - os.freemem)/1000000000
        const memoryTotal = os.totalmem()/1000000000
        const specsembed = new EmbedBuilder()
        .setTitle('> System Usage')
        .setAuthor({ name: `💻 Bot Specs`})
        .setColor("DarkRed")
        .setThumbnail(`${pfp}`)
        .setFooter({ text: `💻 Bot Specs initialized`})
        .addFields({name: `• Memory:`, value: `> ${(memoryUsed/memoryTotal * 100).toFixed(1)}%`})
        .addFields({name: '• OS:', value: `> ${os.type}`})
        .addFields({name: `• OS Version:`, value: `> ${os.release}`})
        .addFields({name: '• CPU: ', value: `> ${usagePercent.toFixed(1)}%`, inline: true})
        .addFields({name: '• CPU Type (Arch): ', value: `> ${os.arch}`, inline: true})
        .setTimestamp()
        await interaction.reply({embeds: [specsembed]})
 
        break;
        case 'ping':
 
        const embedping = new EmbedBuilder()
        .setColor("DarkBlue")
        .setTitle('Connection between YourBot \nand your client')
        .setThumbnail(`${pfp}`)
        .setDescription( `> Pong: ${Math.round(client.ws.ping)}ms`)
        .setFooter({ text: `🏓 Ping recorded`})
        .setTimestamp()
        .setAuthor({ name: `🏓 Ping Command`})
 
        await interaction.reply({ embeds: [embedping] })
 
        break;
        case 'online':
 
        const embedonline = new EmbedBuilder()
        .setColor("Green")
        .setTitle('The bot is **online!**')
        .setDescription('> YourBot is fuctioning correctly.')
        .setThumbnail(`${pfp}`)
        .setFooter({ text: `🟢 Online command succeeded`})
        .setTimestamp()
        .setAuthor({ name: `🟢 Online Command`})
 
        await interaction.reply({ embeds: [embedonline] })
 
        }
    }
}