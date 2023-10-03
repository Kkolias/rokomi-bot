import liigaUtil from "./Liiga";
import { parseISODate } from "./time";

async function testi() {
  // const games = await liigaUtil.getTodaysLiigaGames()

  // const parsedGames = liigaUtil.parseTeamsFromGames(games)
  // console.log(games)
  // const output = parsedGames?.map(g => `${g}\n`).join('')
  // console.log(output)
  // const allGames = await liigaUtil.getRunkosarjaGames('2024')
  // const today = new Date()
  // const todayISO = parseISODate(today)

  const i = 10;
  const x = 20;
  const negativeX = -x;

  // const sum = i + negativeX

  const test = await liigaUtil.getParsedSingleGameStats(58);
  console.log(test);
}

testi();
