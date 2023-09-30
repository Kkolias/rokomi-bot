import axios from "axios"

const url = 'https://liiga.fi/api/v1/games?tournament=runkosarja&season='

export default async function getRunkosarjaGames(season: string): Promise<any> {
    const r = await axios.get(`${url}${season}`)
    return r?.data || null
}