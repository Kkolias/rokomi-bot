import axios from "axios";
import { getNextDayISO, getSeasonForDate, getTime, parseDate, parseISODate } from "./time";
import { type LiigaGame } from "../interfaces/liiga"
import { LiigaSeries } from "../enums/liiga.enum";

const URLS = {
  LIIGA_GAMES: "https://liiga.fi/api/v1/games?tournament=all&season=",
};

export class LiigaUtil {
  async getRunkosarjaGames(season: string): Promise<any[]> {
    const r = await axios.get(`${URLS.LIIGA_GAMES}${season}`);
    return r?.data || null;
  }

  async getSeasonLiigaGames(): Promise<LiigaGame[]> {
    const today = new Date();
    const season = getSeasonForDate(today).toString();

    return await this.getRunkosarjaGames(season);
  }

  getTodaysLiigaGames(allGames: LiigaGame[]): LiigaGame[] {
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

  private filterLiigaGamesByDay(allGames: LiigaGame[], day: string): LiigaGame[] {
    return allGames?.filter((g: LiigaGame) => {
      const start = g?.start;
      const serie = g?.serie;

      const startISO = parseISODate(new Date(start));

      return startISO === day && this.isRunkosarjaOrPlayoffs(serie);
    }) || []
  }

  parseTeamsFromGames(gameList: LiigaGame[]): string[] {
    return gameList?.map((game) => {
      const homeTeamName = game?.homeTeam?.teamName || "";
      const awayTeamName = game?.awayTeam?.teamName || "";

      const gameStartDateTime = game?.homeTeam?.gameStartDateTime;
      const parsedDay = parseDate(new Date(gameStartDateTime))
      const timeOfStart = getTime(new Date(gameStartDateTime));

      return `${homeTeamName} - ${awayTeamName} | ${parsedDay} ${timeOfStart}`;
    });
  }

  private isRunkosarjaOrPlayoffs(serie: LiigaSeries): boolean {
    return serie === LiigaSeries.RUNKOSARJA || serie === LiigaSeries.PLAYOFFS;
  }

  getNextGameDayLiigaGames(allGames: LiigaGame[], day: string, looped = 0): LiigaGame[] {
    if(looped > 31) return []
    const nextDayGames = this.filterLiigaGamesByDay(allGames, day)

    if(!nextDayGames?.length) {
      return this.getNextGameDayLiigaGames(allGames, getNextDayISO(new Date(day)), looped + 1)
    }

    return nextDayGames
  }
}

export default new LiigaUtil();
