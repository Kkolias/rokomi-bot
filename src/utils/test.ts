import liigaUtil from "./Liiga";
import { parseISODate } from "./time";


async function testi() {

    // const games = await liigaUtil.getTodaysLiigaGames()
    
    // const parsedGames = liigaUtil.parseTeamsFromGames(games)
    // console.log(games)
    // const output = parsedGames?.map(g => `${g}\n`).join('')
    // console.log(output)
    const allGames = await liigaUtil.getRunkosarjaGames('2024')
    const today = new Date()
    const todayISO = parseISODate(today)

    const test = liigaUtil.getNextGameDayLiigaGames(allGames, todayISO)
    console.log(test)
}

testi()