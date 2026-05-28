const { QueryType, useMainPlayer } = require('discord-player'); //discord.gg/vsc ❤️ oxyinc, can066
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');
const play = require('play-dl');

module.exports = {
    name: 'play',
    description: ("Play a song!"),
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: ('The song you want to play'),
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter, client }) {
        // Discord'un 3 saniye sınırını aşmamak için yanıtı erteliyoruz
        await inter.deferReply(); 

        const player = useMainPlayer();
        const song = inter.options.getString('song');
        
        // Doğru play-dl fonksiyonu ile Spotify kontrolü yapıyoruz
        try {
            if (play.sp_validate(song)) {
                // Spotify linki ise sorunsuz devam etmesi için koruma
            }
        } catch (e) {
            // Olası bir doğrulama hatasını loglara basıp botun çökmesini önlüyoruz
            console.log("Spotify validation bypass");
        }

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        let defaultEmbed = new EmbedBuilder().setColor('#2f3136');

        if (!res?.tracks.length) {
            defaultEmbed.setAuthor({ name: await Translate(`No results found... try again ? <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] });
        }

        try {
            const { track } = await player.play(inter.member.voice.channel, song, {
                nodeOptions: {
                    metadata: {
                        channel: inter.channel
                    },
                    volume: client.config.opt.volume,
                    leaveOnEmpty: client.config.opt.leaveOnEmpty,
                    leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
                    leaveOnEnd: client.config.opt.leaveOnEnd,
                    leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
                }
            });

            defaultEmbed.setAuthor({ name: await Translate(`Loading <${track.title}> to the queue... <✅>`) });
            await inter.editReply({ embeds: [defaultEmbed] });
        } catch (error) {
            console.log(`Play error: ${error}`);
            defaultEmbed.setAuthor({ name: await Translate(`I can't join the voice channel... try again ? <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] });
        }
    }
}
