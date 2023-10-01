import { Client, IntentsBitField } from "discord.js";
import userIsBot from "./utils/userIsBot";
import { commands } from "./utils/registerCommands";
import liigaCommandHandler from "./commandHandlers/LiigaCommands";
require("dotenv").config();

const options = {
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
};

const client = new Client(options);

// client?.user?.setPresence({
//   activities: [{
//       name: 'asdasd',
//       type: ActivityType.Playing,
//       url: 'youtube.com'
//   }],
//   status: 'online'
// });

client.on("ready", (c) => console.log(`🔥 ${c.user.tag} is online!`));

client.on("messageCreate", (m) => {
  if (userIsBot(m.author)) return;

  if (m.content === "asd") m.reply("asd");
});

client.on("interactionCreate", async (i) => {
  if (!i.isChatInputCommand()) return;

  if (i.commandName === "aamuja") {
    i.reply("morgons");
  }
  if (i.commandName === "humppa") {
    i.reply(
      "https://tenor.com/view/antti-anttihot-antti-tulee-kyl%C3%A4%C3%A4n-gif-26260730"
    );
  }
  if (i.commandName === "komentoja") {
    const commandList =
      commands?.map((c) => `/${c?.name} - ${c?.description}\n`) || [];
    const text = commandList?.join("");
    const textWithPrefix = `Komento | Kuvaus\n ${text}`;
    i.reply(textWithPrefix);
  }
  if (i.commandName === "liigatoday") {
    const output = await liigaCommandHandler.liigaToday()
    i.reply(output)
  }
});

const token = process.env.BOT_TOKEN;
client.login(token);
