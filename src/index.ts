import { Client, IntentsBitField } from "discord.js";
import userIsBot from "./utils/userIsBot";
import { commands } from "./utils/registerCommands";
import liigaCommandHandler from "./commandHandlers/LiigaCommands";
import userService from './user/userService'
import mongoose from "mongoose";
import betService from "./bet/betService";
import checkBetsUtil from './bet/utils/checkOpenBets'

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

// init mongoDB
const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u2byesr.mongodb.net/` // dev



mongoose.connect(mongoUrl, { dbName: 'rokomi-db' });





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
    console.log(i.user)
    const output = await liigaCommandHandler.liigaToday()
    i.reply(output)
  }
  if (i.commandName.includes("gameodds")) {
    const id = (i.options.get('id')?.value || 0) as number
    const output = await liigaCommandHandler.gameOdds(id)
    i.reply(output)
  }

  if(i.commandName === 'userstats') {
    const discordUser = i?.user
    const { user, error } = await userService.findByIdOrCreate(discordUser)
    
    if(error) {
      i.reply(error)
    } else {
      
      i.reply(`${user?.id} - ${user?.name} - balance: ${user?.balance}`)
    }
  }

  if(i.commandName === 'addmybalance') {
    const discordUser = i?.user
    const amount = (i.options.get('amount')?.value || 0) as number

    const reply = await userService.handleAddBalanceToUser(discordUser, amount)
    i.reply(reply)
  }

  if(i.commandName === 'adduserbalance') {
    const discordUser = i?.user
    const amount = (i.options.get('amount')?.value || 0) as number
    const id = (i.options.get('id')?.value || 0) as string

    const reply = await userService.handleAddBalanceToAnotherUser(discordUser, id, amount)
    i.reply(reply)
  }

  if(i.commandName === 'testi') {
    // const test = await userService.findByIdList(['305765136348479490'])
    // console.log("TESTI: ", test)
    await betService.createTestBest()
    i.reply('juu')
  }
  if(i.commandName === 'checkbets') {
    const reply = await checkBetsUtil.execute()
    i.reply(reply)
  }
});

const token = process.env.BOT_TOKEN;
client.login(token);
