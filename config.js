module.exports = { //discord.gg/vsc ❤️ oxyinc, can066
    app: {
        TOKEN: process.env.TOKEN,
        playing: 'discord.gg/jayus',
        global: true, // Eğer global false olur ise sadece gelirlediğiniz sunucuda çalışır
        guild: '1487568096125259878', // GuildID
        extraMessages: false,
        loopMessage: false,
        lang: 'tr',
        enableEmojis: true,
    },

    emojis:{
        'back': '⏪',
        'skip': '⏩',
        'ResumePause': '⏯️',
        'savetrack': '💾',
        'volumeUp': '🔊',
        'volumeDown': '🔉',
        'loop': '🔁',
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        Translate_Timeout: 1000,
        maxVol: 100,
        spotifyBridge: true,
        volume: 75,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 30000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 30000,
                discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25, // İndirme havuzunu büyüterek AbortError'ü engeller
                requestOptions: {
                    headers: {
                        // SoundCloud engeline takılmamak için tarayıcı taklidi yapar
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                    }
                }
            }
        }
    }
};
