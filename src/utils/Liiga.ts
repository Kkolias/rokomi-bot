import axios from "axios";
import { getSeasonForDate, getTime, parseISODate } from "./time";
import { LiigaGame, LiigaSeries } from "../interfaces/liiga";

const URLS = {
  LIIGA_GAMES: "https://liiga.fi/api/v1/games?tournament=all&season=",
};

export class LiigaUtil {
  async getRunkosarjaGames(season: string): Promise<LiigaGame[]> {
    const r = await axios.get(`${URLS.LIIGA_GAMES}${season}`);
    return r?.data || null;
  }

  async getTodaysLiigaGames(): Promise<LiigaGame[]> {
    const today = new Date();
    const season = getSeasonForDate(today).toString();

    const allGames = await this.getRunkosarjaGames(season);
    return this.filterTodayLiigaGames(allGames)
  }

  private filterTodayLiigaGames(allGames: LiigaGame[]): LiigaGame[] {
    const todayISODate = parseISODate(new Date());
    return allGames?.filter((g: LiigaGame) => {
      const start = g?.start;
      const serie = g?.serie;

      const startISO = parseISODate(new Date(start));

      return startISO === todayISODate && this.isRunkosarjaOrPlayoffs(serie);
    }) || []
  }

  parseTeamsFromGames(gameList: LiigaGame[]): string[] {
    return gameList?.map((game) => {
      const homeTeamName = game?.homeTeam?.teamName || "";
      const awayTeamName = game?.awayTeam?.teamName || "";

      const gameStartDateTime = game?.homeTeam?.gameStartDateTime;
      const timeOfStart = getTime(new Date(gameStartDateTime));

      return `${homeTeamName} - ${awayTeamName} | ${timeOfStart}`;
    });
  }

  private isRunkosarjaOrPlayoffs(serie: LiigaSeries): boolean {
    return serie === LiigaSeries.RUNKOSARJA || serie === LiigaSeries.PLAYOFFS;
  }
}

export default new LiigaUtil();
