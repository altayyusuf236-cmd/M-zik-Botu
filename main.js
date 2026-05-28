require('dotenv').config(); //discord.gg/vsc ❤️ oxyinc, can066

// main.js dosyanın en üst kısmı böyle olmalı:
const express = require('express');
const app = express();
// Render bize PORT değişkenini verir, onu kullanmalıyız.
const port = process.env.PORT || 3000; 

app.get('/', (req, res) => {
  res.send('Bot aktif ve çalışıyor!');
});

app.listen(port, '0.0.0.0', () => {
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

if (process.env.YOUTUBE_COOKIE) {
    // Çerezin içindeki tüm gizli satır atlamalarını ve kenar boşluklarını temizler
    const cleanCookie = process.env.YOUTUBE_COOKIE.replace(/[\r\n]+/g, '').trim();
    
    play.setToken({
        youtube: {
            cookie: cleanCookie
        }
    });
    console.log("✅ YouTube Cookie başarıyla temizlenerek sisteme yüklendi.");
} else {
    console.log("❌ UYARI: .env veya Render ayarlarında YOUTUBE_COOKIE bulunamadı!");
}


// Player başlatılıyor
const player = new Player(client, client.config.opt.discordPlayer);

console.clear();
require('./loader');

client.login(client.config.app.TOKEN).catch(async (e) => {
    if (e.message === 'An invalid token was provided.') {
        require('./process_tools').throwConfigError('app', 'token', '\n\t   ❌ Invalid Token Provided! ❌ \n\tChange the token in the config file\n');
    } else {
        console.error('❌ An error occurred while trying to login to the bot! ❌ \n', e);
    }
});
