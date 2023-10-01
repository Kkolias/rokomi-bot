import liigaUtil from "./Liiga";


async function testi() {

    const games = await liigaUtil.getTodaysLiigaGames()
    
    const parsedGames = liigaUtil.parseTeamsFromGames(games)
    console.log(games)
    const output = parsedGames?.map(g => `${g}\n`).join('')
    console.log(output)
}

testi()