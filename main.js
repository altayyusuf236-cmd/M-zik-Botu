require('dotenv').config(); //discord.gg/vsc ❤️ oxyinc, can066

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot aktif ve çalışıyor!');
});

app.listen(port, () => {
  console.log(`Web sunucusu ${port} portunda dinliyor.`);
});


const { Player } = require('discord-player');
const play = require('play-dl');
const { Client, GatewayIntentBits } = require('discord.js');

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');

play.setToken({
    youtube: {
        cookie: process.env.YOUTUBE_COOKIE
    }
});
const player = new Player(client, client
// play-dl extractor'ını discord-player'a tanıtıyoruz
player.extractors.register(require('@discord-player/extractor').PlayDlExtractor, {});

console.clear();
require('./loader');

client.login(client.config.app.TOKEN).catch(async (e) => {
    if (e.message === 'An invalid token was provided.') {
        require('./process_tools').throwConfigError('app', 'token', '\n\t   ❌ Invalid Token Provided! ❌ \n\tChange the token in the config file\n');
    } else {
        console.error('❌ An error occurred while trying to login to the bot! ❌ \n', e);
    }
});
