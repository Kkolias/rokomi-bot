import { parseISODate } from "../utils/time";
import liigaUtil from "../utils/Liiga";
import { LiigaGame } from "interfaces/liiga";

export class LiigaCommandHandler {
  async gameOdds(gameId: number): Promise<string> {
    return await liigaUtil.getParsedSingleGameStats(gameId)
  }

  async liigaToday(): Promise<string> {
    const allGames = await liigaUtil.getSeasonLiigaGames();
    const todayGames = liigaUtil.getTodaysLiigaGames(allGames);
    const parsedGames = liigaUtil.parseTeamsFromGames(todayGames);

    if (parsedGames?.length) {
      const output = parsedGames?.map((g) => `${g}\n`).join("");
      return output;
    }

    return this.findNextGames(allGames);
  }

  private findNextGames(allGames: LiigaGame[]): string {
    const nextGames = liigaUtil.getNextGameDayLiigaGames(
      allGames,
      parseISODate(new Date())
    );

    if (nextGames?.length) {
      const parsedGames = liigaUtil.parseTeamsFromGames(nextGames);
      const parsedOutput = parsedGames?.map((g) => `${g}\n`);
      const withPrefix = [
        "Ei liigapelejä tänään. Seuraavat pelit: \n",
        ...parsedOutput,
      ];
      const output = withPrefix.join("");
      return output;
    } else {
      return "vedä käteen";
    }
  }
}

export default new LiigaCommandHandler();
