import axios from "axios";
import { getSeasonForDate, getTime, parseISODate } from "./time";

const URLS = {
  RUNKOSARJA_GAMES:
    "https://liiga.fi/api/v1/games?tournament=runkosarja&season=",
};

export class LiigaUtil {
  async getRunkosarjaGames(season: string): Promise<any> {
    const r = await axios.get(`${URLS.RUNKOSARJA_GAMES}${season}`);
    return r?.data || null;
  }

  async getTodaysRunkosarjaGames(): Promise<any> {
    const today = new Date();
    const season = getSeasonForDate(today).toString();

    const ISODate = parseISODate(today);
    const allGames = await this.getRunkosarjaGames(season);
    return (
      allGames?.filter((g: any) => {
        const start = g?.start;

        const startISO = parseISODate(new Date(start));

        return startISO === ISODate;
      }) || []
    );
  }

  parseTeamsFromGames(gameList: any[]): any[] {
    return gameList?.map((game) => {
      const homeTeamName = game?.homeTeam?.teamName || "";
      const awayTeamName = game?.awayTeam?.teamName || "";

      const gameStartDateTime = game?.homeTeam?.gameStartDateTime
      const timeOfStart = getTime(new Date(gameStartDateTime))

      return `${homeTeamName} - ${awayTeamName} | ${timeOfStart}`;
    });
  }
}

export default new LiigaUtil();
