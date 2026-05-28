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

        // Kanalları ve ses durumunu en başta garantiye alıyoruz
        const voiceChannel = inter.member?.voice?.channel;
        const textChannel = inter.channel;

        if (!voiceChannel) {
            defaultEmbed.setAuthor({ name: "Bir ses kanalında olmalısın! <❌>" });
            return inter.editReply({ embeds: [defaultEmbed] }).catch(() => null);
        }

        const res = await player.search(song, {
            requestedBy: inter.member
        }).catch(() => null);

        if (!res || !res.tracks || !res.tracks.length) {
            defaultEmbed.setAuthor({ name: await Translate(`No results found... try again ? <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] }).catch(() => null);
        }

        // Güvenli queue oluşturma
        const queue = player.nodes.create(inter.guild, {
            metadata: { channel: textChannel }, // Kanalı buraya gömdük
            volume: client.config.opt.volume || 75,
            bufferingTimeout: 15000,
            connectionTimeout: 30000,
            noReadyTimeout: true
        });

        // Ses kanalına bağlanma kontrolü
        try {
            if (!queue.connection) await queue.connect(voiceChannel);
        } catch (err) {
            console.log(`Bağlantı hatası: ${err}`);
            defaultEmbed.setAuthor({ name: await Translate(`I can't join the voice channel... try again ? <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] }).catch(() => null);
        }

        try {
            queue.addTrack(res.tracks[0]);
            
            if (!queue.isPlaying()) {
                await queue.node.play();
            }

            // Unknown Channel hatasını önlemek için mesaj gönderme işlemini korumaya alıyoruz
            const trackTitle = res.tracks[0].title || "Şarkı";
            defaultEmbed.setAuthor({ name: await Translate(`Loading <${trackTitle}> to the queue... <✅>`) });
            
            // .catch(() => null) sayesinde kanal bulunamazsa bile bot artık ASLA çökmeyecek kanka
            return inter.editReply({ embeds: [defaultEmbed] }).catch((err) => console.log("Mesaj gönderme bypass edildi:", err.message));

        } catch (error) {
            console.log(`Oynatma hatası: ${error}`);
            defaultEmbed.setAuthor({ name: await Translate(`An error occurred while playing... <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] }).catch(() => null);
        }
    }
}
