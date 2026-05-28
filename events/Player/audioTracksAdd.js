const { EmbedBuilder } = require('discord.js'); //discord.gg/jayus ❤️ oxyinc, can066
const { Translate } = require('../../process_tools');

module.exports = (queue) => {
    // client nesnesine queue üzerinden güvenli bir şekilde erişiyoruz ki çökmesin
    const client = queue.metadata?.channel?.client;
    if (!client || !client.config?.app?.extraMessages) return;
    
    (async () => {
        try {
            const channel = queue.metadata?.channel;
            if (!channel) return;

            const embed = new EmbedBuilder()
                .setAuthor({ name: await Translate(`All the songs in playlist added into the queue <✅>`)})
                .setColor('#2f3136');

            // .catch(() => null) koruması eklendi
            await channel.send({ embeds: [embed] }).catch((err) => console.log("audioTracksAdd mesajı bypass edildi:", err.message));
        } catch (error) {
            console.log("audioTracksAdd Event Hatası:", error.message);
        }
    })();
};
