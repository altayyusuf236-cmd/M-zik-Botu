const { EmbedBuilder } = require('discord.js'); //discord.gg/jayus ❤️ oxyinc, can066
const { Translate } = require('../../process_tools');

module.exports = (queue, track) => {
    // client nesnesine queue üzerinden güvenli bir şekilde erişiyoruz ki çökmesin
    const client = queue.metadata?.channel?.client;
    if (!client || !client.config?.app?.extraMessages) return;

    (async () => {
        try {
            const channel = queue.metadata?.channel;
            if (!channel) return;

            const embed = new EmbedBuilder()
                .setAuthor({ name: await Translate(`Track <${track.title}> added in the queue <✅>`), iconURL: track.thumbnail })
                .setColor('#2f3136');

            // .catch(() => null) ekledik, böylece Unknown Channel hatası bota asla zarar veremeyecek
            await channel.send({ embeds: [embed] }).catch((err) => console.log("audioTrackAdd mesajı bypass edildi:", err.message));
        } catch (error) {
            console.log("audioTrackAdd Event Hatası:", error.message);
        }
    })();
};
