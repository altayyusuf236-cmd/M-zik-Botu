const { Translate } = require('../../process_tools'); //discord.gg/jayus ❤️ oxyinc, can066

module.exports = async (client) => {
    console.log(await Translate(`Logged to the client <${client.user.username}>.`));
    console.log(await Translate("discord.gg/jayus"));
    
    client.user.setActivity(client.config.app.playing);
}