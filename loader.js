console.log("Loader.js yuklenmeye basladi...");
const { readdirSync } = require("fs");
const { Collection } = require("discord.js");
const { useMainPlayer } = require("discord-player");
client.commands = new Collection();
const commandsArray = [];
const player = useMainPlayer();

// Extractor buraya geldi (Asıl oyuncu burası)
const { PlayDlExtractor } = require('@discord-player/extractor');
// loader.js içinde:
const { PlayDlExtractor } = require('@discord-player/extractor');

try {
    // Bazı sürümlerde PlayDlExtractor'ı doğrudan değil de 'new' ile kullanmak gerekebilir
    // Ayrıca kayıt ederken hata almamak için şu yöntemi deneyelim:
    const extractor = new PlayDlExtractor(); 
    player.extractors.register(extractor, {});
    console.log("✅ PlayDlExtractor başarıyla örneklendi ve kaydedildi.");
} catch (e) {
    console.error("❌ Extractor kaydedilirken hata oluştu: " + e.message);
    // Eğer bu da olmazsa, en azından botun tamamen çökmesini engellemek için
    // burayı boş bırakabilirsin, en azından bot çalışmaya devam eder.
}

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
