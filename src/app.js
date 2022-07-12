require('dotenv').config({path: '../.env'});
const { Client, Intents} = require('discord.js');
const { renameChannels } = require('./channels/renameChannels');
const DISCORD_API_TOKEN = process.env.DISCORD_API_TOKEN;

const GUILD_ID = '993950691037040691';

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`----Bot successfully started as ${client.user.tag} 🤖!----`);
  const guild = client.guilds.cache.get(GUILD_ID);
  renameChannels(client, guild);
});

// Login to Discord with your client's token
client.login(DISCORD_API_TOKEN);






//rename channels https://stackoverflow.com/questions/67808194/how-do-i-make-the-bot-to-change-a-voice-channels-name-discord-js#:~:text=You%20can%20use%20guild.,method%20to%20change%20its%20name.
//bot link https://discord.com/oauth2/authorize?client_id=993207748084899840&scope=bot&permissions=16