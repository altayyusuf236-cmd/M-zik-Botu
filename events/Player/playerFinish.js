module.exports = (queue) => { //discord.gg/jayus ❤️ oxyinc, can066
    if (queue.metadata.lyricsThread) {
        queue.metadata.lyricsThread.delete();
        queue.setMetadata({
            channel: queue.metadata.channel
        });
    }
}
