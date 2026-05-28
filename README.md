# Discord Müzik Botu


**discord.js** ve **discord-player** ile geliştirilmiş güçlü ve zengin özelliklere sahip bir Discord müzik botu. Bu bot, kullanıcıların Discord sunucularında müzik çalmasına, çalma listelerini yönetmesine, ses efektleri uygulamasına ve daha fazlasına olanak tanır.

---

## ✨ Özellikler

- **Müzik Çalma**: `play` komutuyla çeşitli kaynaklardan müzik akışı sağlayın.
- **Çalma Listesi Yönetimi**: Çalma listesine şarkı ekleyin, çıkarın veya belirli bir şarkıya atlayın.
- **Şarkı Sözü Desteği**: Çalan şarkının sözlerini getirin ve görüntüleyin.
- **Ses Filtreleri**: Bass boost, 8D gibi ses efektleri uygulayın.
- **Döngü Modları**: Tek bir şarkıyı, tüm çalma listesini döngüye alın veya otomatik çalmayı etkinleştirin.
- **Etkileşimli Kontroller**: Oynatma, duraklatma, geçme gibi işlemler için düğmelerle kolay kontrol.
- **Ses Seviyesi Kontrolü**: `volumeup` ve `volumedown` ile çalma ses seviyesini ayarlayın.
- **Geçmiş Takibi**: Daha önce çalınan şarkıları `history` komutuyla görüntüleyin.
- **Çoklu Dil Desteği**: Kullanıcı mesajları için dinamik çeviri (yapılandırılabilir dil).
- **Özelleştirilebilir**: `config.js` dosyası üzerinden kolayca ayar yapın.

---

## 📋 Gereksinimler

Botu çalıştırmadan önce aşağıdaki gereksinimlerin yüklü olduğundan emin olun:

- **Node.js**: v20 veya üstü
- **npm**: Node.js ile birlikte gelir
- **Discord Bot Token**: [Discord Developer Portal](https://discord.com/developers/applications) üzerinden alın
- **Bir Discord Sunucusu**: Botu test etmek ve kullanmak için

---

## 🚀 Kurulum

1. **Depoyu Klonlayın Veya İndirin**:
   ```bash
   git clone https://github.com/hasbutcu/yeni-nesil-muzik-botu.git
   cd yeni-nesil-muzik-botu
   ```

2. **Bağımlılıkları Yükleyin**:
   ```bash
   npm install
   ```

3. **Yapılandırma Dosyasını Ayarlayın**:
   - `config.js` dosyasını kopyalayın ve düzenleyin.
   - Discord bot token'ınızı ve diğer ayarları (örneğin, dil veya ses seviyesi) ekleyin.

   Örnek `config.js`:
   ```javascript
   module.exports = { //discord.gg/jayus ❤️ oxyinc, can066
    app: {
        token: 'TOKEN GİR',
        playing: 'discord.gg/jayus',
        global: true, // Eğer global false olur ise sadece gelirlediğiniz sunucuda çalışır
        guild: 'SUNUCU ID', // GuildID
        extraMessages: false,
        loopMessage: false,
        lang: 'tr',
        enableEmojis: true,
    },

    emojis:{
        'back': '⏪',
        'skip': '⏩',
        'ResumePause': '⏯️',
        'savetrack': '💾',
        'volumeUp': '🔊',
        'volumeDown': '🔉',
        'loop': '🔁',
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        Translate_Timeout: 1000,
        maxVol: 100,
        spotifyBridge: true,
        volume: 75,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 30000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 30000,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
  };
  ```

4. **Botu Başlatın**:
   ```bash
   node main.js
   ```

5. **Botu Sunucunuza Ekleyin**:
   - Discord Developer Portal'dan botunuzu sunucunuza davet edin.
   - Gerekli izinleri (örneğin, ses kanallarına bağlanma, mesaj gönderme) verdiğinizden emin olun.

---

## 📖 Kullanım

Botu sunucunuza ekledikten sonra, aşağıdaki komutlarla müzik çalmaya başlayabilirsiniz. Tüm komutlar `/` önekiyle çalışır.

| Komut         | Açıklama                              | Örnek Kullanım                |
|---------------|---------------------------------------|-------------------------------|
| `/play`       | Bir şarkıyı çalar veya sıraya ekler   | `/play Believer`              |
| `/queue`      | Çalma listesindeki şarkıları gösterir | `/queue`                      |
| `/lyrics`     | Çalan şarkının sözlerini getirir      | `/lyrics`                     |
| `/filter`     | Ses efektleri uygular                 | `/filter bassboost`           |
| `/loop`       | Döngü modunu açar/kapar               | `/loop Queue`                 |
| `/volumeup`   | Sesi 5 birim artırır                  | `/volumeup`                   |
| `/volumedown` | Sesi 5 birim azaltır                  | `/volumedown`                 |
| `/pause`      | Çalan şarkıyı duraklatır              | `/pause`                      |
| `/resume`     | Duraklatılan şarkıyı devam ettirir    | `/resume`                     |
| `/clear`      | Çalma listesini temizler              | `/clear`                      |
| `/history`    | Çalınan şarkıların geçmişini gösterir | `/history`                    |
| `/save`       | Çalan şarkıyı özel mesajla gönderir   | `/save`                       |
| `/controller` | Müzik kontrol panelini gönderir       | `/controller #kanal`          |
| `/help`       | Komut listesini gösterir              | `/help`                       |

---

## 🛠️ Özelleştirme

- **Dil Desteği**: `config.js` dosyasında `lang` alanını değiştirerek botun dilini ayarlayabilirsiniz (örneğin, `tr` için Türkçe, `en` için İngilizce).
- **Ses Ayarları**: `opt.volume` ile varsayılan ses seviyesini, `opt.maxVol` ile maksimum ses seviyesini ayarlayın.
- **Olaylar**: `./events/Discord/` ve `./events/Player/` klasörlerindeki olay işleyicilerini özelleştirerek botun davranışlarını değiştirebilirsiniz.
- **Komutlar**: Yeni komutlar eklemek için `./commands/` klasörüne yeni bir JavaScript dosyası ekleyin ve gerekli yapıyı takip edin.

---

## 📜 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

---

## 💌 İletişim

Sorularınız veya önerileriniz için:

- **Discord**: [discord.gg/jayus](https://discord.gg/jayus)
- **GitHub Sorunları**: [Sorun Bildir](https://github.com/kullanici_adiniz/yeni-nesil-muzik-botu/issues)

Bu müzik botu, sunucunuzda eğlenceli ve etkileşimli bir müzik deneyimi sunmak için tasarlandı. Keyfini çıkarın! 🎶
