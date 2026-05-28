console.log("Loader.js yuklenmeye basladi...");
const { readdirSync } = require("fs");
const { Collection } = require("discord.js");
const { Player } = require("discord-player");

client.commands = new Collection();
const commandsArray = [];

// Discord Player'ı ana yöntemle başlatıyoruz ve tüm extractor'ları otomatik yüklüyoruz
const player = new Player(client);

async function initPlayer() {
    try {
        // Bu tek satır, arkadaki tüm ses köprülerini (Spotify dahil) otomatik ve hatasız yükler
        await player.extractors.loadDefault();
        console.log("✅ Tüm ses extractor'ları başarıyla yüklendi!");
    } catch (e) {
        console.log("⚠️ Extractor yükleme hatası: " + e.message);
    }
}
initPlayer();

//discord.gg/vsc ❤️ oxyinc, can066

const { Translate, GetTranslationModule } = require("./process_tools");

const discordEvents = readdirSync("./events/Discord/").filter((file) =>
  file.endsWith(".js")
);
const playerEvents = readdirSync("./events/Player/").filter((file) =>
  file.endsWith(".js")
);

GetTranslationModule().then(() => {
  console.log("| Translation Module Loaded |");

  for (const file of discordEvents) {
    const DiscordEvent = require(`./events/Discord/${file}`);
    const txtEvent = `< -> > [Loaded Discord Event] <${file.split(".")[0]}>`;
    parseLog(txtEvent);
    client.on(file.split(".")[0], DiscordEvent.bind(null, client));
    delete require.cache[require.resolve(`./events/Discord/${file}`)];
  }

  for (const file of playerEvents) {
    const PlayerEvent = require(`./events/Player/${file}`);
    const txtEvent = `< -> > [Loaded Player Event] <${file.split(".")[0]}>`;
    parseLog(txtEvent);
    player.events.on(file.split(".")[0], PlayerEvent.bind(null));
    delete require.cache[require.resolve(`./events/Player/${file}`)];
  }

  readdirSync("./commands/").forEach((dirs) => {
    const commands = readdirSync(`./commands/${dirs}`).filter((files) =>
      files.endsWith(".js")
    );

    for (const file of commands) {
      const command = require(`./commands/${dirs}/${file}`);
      if (command.name && command.description) {
        commandsArray.push(command);
        const txtEvent = `< -> > [Loaded Command] <${command.name.toLowerCase()}>`;
        parseLog(txtEvent);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
      } else {
        const txtEvent = `< -> > [Failed Command] <${command.name.toLowerCase()}>`;
        parseLog(txtEvent);}
    }
  });

  client.on("ready", (client) => {
    if (client.config.app.global)
      client.application.commands.set(commandsArray);
    else
      client.guilds.cache
        .get(client.config.app.guild)
        .commands.set(commandsArray);
  });

  async function parseLog(txtEvent) {
    console.log(await Translate(txtEvent, null));
  }
}).catch((err) => {
  console.error("!!! LOADER HATA VERDI !!!");
  console.error(err);
  process.exit(1); 
});
