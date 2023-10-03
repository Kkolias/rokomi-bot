import { REST } from "@discordjs/rest";
import { ApplicationCommandOptionType, Routes } from "discord.js";

require("dotenv").config();

const clientId = process.env.CLIENT_ID as string;
const guildId = process.env.SERVER_ID as string;
const token = process.env.BOT_TOKEN as string

export const commands = [
  {
    name: "aamuja",
    description: "morgonia berkeleesti",
  },
  {
    name: "humppa",
    description: "humpuuki",
  },
  {
    name: 'komentoja',
    description: 'KOMENNOT'
  },
  {
    name: 'liigatoday',
    description: 'Liigapelit tänään'
  },
  {
    name: 'gameodds',
    description: 'Kertoimet ottelulle /gameodds <id>',
    options: [
      {
        type: ApplicationCommandOptionType.Number,
        name: "id",
        description: 'ottelun id',
        required: true
      }
    ]
  },
  {
    name: 'userstats',
    description: 'stats of user'
  },
  {
    name: 'addmybalance',
    description: 'lisää sulle fyffee',
    options: [
      {
        type: ApplicationCommandOptionType.Number,
        name: "amount",
        description: 'rahuli määrä joka lisätään',
        required: true
      }
    ]
  },
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("registering slash commands");
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("success");
  } catch (e) {
    console.error("Error occured: ", e);
  }
})();
