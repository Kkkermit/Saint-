const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, Partials, ActivityType, Activity, AuditLogEvent, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType, AttachmentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require(`discord.js`);
const fs = require('fs');
require('./functions/processHandlers')()
const {DisTube} = require("distube")
const {SpotifyPlugin} = require("@distube/spotify")
const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.MessageContent, 
	GatewayIntentBits.GuildMembers, 
	GatewayIntentBits.GuildPresences, 
	GatewayIntentBits.GuildIntegrations, 
	GatewayIntentBits.GuildWebhooks, 
    GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.MessageContent, 
	GatewayIntentBits.GuildEmojisAndStickers, 
	GatewayIntentBits.DirectMessages, 
	GatewayIntentBits.DirectMessageTyping, 
	GatewayIntentBits.GuildModeration, 
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.GuildWebhooks, 
	GatewayIntentBits.AutoModerationConfiguration,
	GatewayIntentBits.GuildScheduledEvents, 
	GatewayIntentBits.GuildMessageTyping, 
	GatewayIntentBits.AutoModerationExecution, 
],  

partials: [
    Partials.GuildMember, 
    Partials.Channel,
    Partials.GuildScheduledEvent, 
    Partials.Message,
    Partials.Reaction, 
    Partials.ThreadMember, 
    Partials.User
]

}); 

client.on("ready", async (client) => {
 
    setInterval(() => {

        let activities = [
            { type: 'Playing', name: 'Music in Subway!'},
            { type: 'Playing', name: '/help-guide.'},
        ];

        const status = activities[Math.floor(Math.random() * activities.length)];

        if (status.type === 'Watching') {
            client.user.setPresence({ activities: [{ name: `${status.name}`, type: ActivityType.Watching }]});
        } else {
            client.user.setPresence({ activities: [{ name: `${status.name}`, type: ActivityType.Playing }]});
        } 
    }, 10000);
}) 
client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true, 
    emitAddListWhenCreatingQueue: false, 
    plugins: [new SpotifyPlugin()]
});

const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [new EmbedBuilder().setColor("Green")
                .setDescription(`🎶 | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user
                    }\n${status(queue)}`)]
        })
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send(
            {
                embeds: [new EmbedBuilder().setColor("Green")
                    .setDescription(`🎶 | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)]
            }
        )
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel.send(
            {
                embeds: [new EmbedBuilder().setColor("Green")
                    .setDescription(`🎶 | Added \`${playlist.name}\` playlist (${playlist.songs.length
                        } songs) to queue\n${status(queue)}`)]
            }
        )
    )
    .on('error', (channel, e) => {
        if (channel) channel.send(`⛔ | An error encountered: ${e.toString().slice(0, 1974)}`)
        else console.error(e)
    })
    .on('empty', channel => channel.send({
        embeds: [new EmbedBuilder().setColor("Red")
            .setDescription('⛔ |Voice channel is empty! Leaving the channel...')]
    }))
    .on('searchNoResult', (message, query) =>
        message.channel.send(
            {
                embeds: [new EmbedBuilder().setColor("Red")
                    .setDescription('`⛔ | No result found for \`${query}\`!`')]
            })
    )
    .on('finish', queue => queue.textChannel.send({
        embeds: [new EmbedBuilder().setColor("Green")
            .setDescription('🏁 | Queue finished!')]
    }))

// status //

client.on("ready", () => {
    console.log('Bot is online.');

    client.user.setStatus("dnd");

}) 

