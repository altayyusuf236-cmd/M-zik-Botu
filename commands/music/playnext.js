const { QueryType, useMainPlayer } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'playnext',
    description: "Play a song next!",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'The song you want to play next',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter, client }) {
        const player = useMainPlayer();
        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO // Burayı da AUTO yapıyoruz kanka
        });

        let defaultEmbed = new EmbedBuilder().setColor('#2f3136');

        if (!res?.tracks.length) {
            defaultEmbed.setAuthor({ name: await Translate(`No results found... try again ? <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] });
        }

        try {
            const queue = player.nodes.create(inter.guild, {
                metadata: { channel: inter.channel },
                volume: client.config.opt.volume,
                leaveOnEmpty: client.config.opt.leaveOnEmpty,
                leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
                leaveOnEnd: client.config.opt.leaveOnEnd,
                leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
            });

            if (!queue.connection) await queue.connect(inter.member.voice.channel);

            queue.insertTrack(res.tracks[0], 0); 

            if (!queue.isPlaying()) await queue.node.play();

            defaultEmbed.setAuthor({ name: await Translate(`Loading <${res.tracks[0].title}> to play next... <✅>`) });
            await inter.editReply({ embeds: [defaultEmbed] });

        } catch (error) {
            console.log(`Playnext error: ${error}`);
            defaultEmbed.setAuthor({ name: await Translate(`An error occurred... try again ? <❌>`) });
            return inter.editReply({ embeds: [defaultEmbed] });
        }
    }
}
