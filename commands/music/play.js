const { useMainPlayer } = require('discord-player'); //discord.gg/vsc ❤️ oxyinc, can066
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'play',
    description: "Play a song!",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'The song you want to play',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter, client }) {
        const player = useMainPlayer();
        const song = inter.options.getString('song');
        
        let defaultEmbed = new EmbedBuilder().setColor('#2f3136');

        const res = await player.search(song, {
            requestedBy: inter.member
        }).catch(() => null);

        if (!res || !res.tracks || !res.tracks.length) {
            defaultEmbed.setAuthor({ name: await Translate(`No results found... try again ? <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] });
        }

        // Render sunucusunun yavaşlığına karşı maksimum tolerans ayarları
        const queue = player.nodes.create(inter.guild, {
            metadata: { channel: inter.channel },
            volume: client.config.opt.volume || 75,
            bufferingTimeout: 15000, // Süreyi 15 saniyeye çıkardık ki AbortError vermesin kanka
            connectionTimeout: 30000, // Ses kanalına bağlanma süresini de uzattık
            noReadyTimeout: true // Hazır olana kadar botun işlemi iptal etmesini engeller
        });

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel);
        } catch (err) {
            defaultEmbed.setAuthor({ name: await Translate(`I can't join the voice channel... try again ? <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] });
        }

        try {
            queue.addTrack(res.tracks[0]);
            
            if (!queue.isPlaying()) {
                await queue.node.play();
            }

            const trackTitle = res.tracks[0].title || "Şarkı";
            defaultEmbed.setAuthor({ name: await Translate(`Loading <${trackTitle}> to the queue... <✅>`) });
            return inter.editReply({ embeds: [defaultEmbed] });

        } catch (error) {
            console.log(`Oynatma hatası: ${error}`);
            defaultEmbed.setAuthor({ name: await Translate(`An error occurred while playing... <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] });
        }
    }
}
