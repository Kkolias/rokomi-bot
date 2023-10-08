import { IBetItem } from "../../Schema/BetItem";
import betService from "../../bet/betService";
import liigaUtil from "../../utils/Liiga";
import { SingleLiigaGame } from "../../interfaces/liiga";
import { getSeasonForDate } from "../../utils/time";
import { IUser } from "../../Schema/User";
import userService from "../../user/userService";

export class CheckOpenBetsUtil {


  async execute() {
    const openBets = await this.getOpenBets();
    const userIdListOfBets = openBets?.map(b => b?.userId) || []
    const gameIdsOfOpenBets = this.getUniqueBetUrls(openBets);

    const openFinishedGames = await this.getFinishedGames(gameIdsOfOpenBets)

    await this.handleOpenbets(openBets, openFinishedGames)

    return await this.parseOutput(userIdListOfBets)
  }

  private async getOpenBets(): Promise<IBetItem[]> {
    return await betService.findAllOpenBets();
  }

  private getUniqueBetUrls(bets: IBetItem[]): number[] {
    const gameUrls = bets?.map((b) => b?.gameId) || [];

    return [...new Set(gameUrls)];
  }

  private async getFinishedGames(
    gameIds: number[]
  ): Promise<SingleLiigaGame[]> {
    const today = new Date();
    const season = getSeasonForDate(today).toString();

    const allGames = await Promise.all(
      gameIds?.map(async (id) => await liigaUtil.getSingleLiigaGame(season, id))
    );
    const allFinishedGames = (allGames?.filter((g) => g?.game?.ended) ||
      []) as SingleLiigaGame[];

    return allFinishedGames;
  }

  async handleOpenbets(openBets: IBetItem[], openFinishedGames: SingleLiigaGame[]): Promise<boolean> {
    await Promise.all(openBets?.map(async bet => await this.handleSingleBet(bet, openFinishedGames)))
    return true // paskaa koodia 
}

  async handleSingleBet(bet: IBetItem, openFinishedGames: SingleLiigaGame[]): Promise<void> {
    const bettedGame = openFinishedGames?.find(g => g?.game?.id === bet?.gameId)

    if(!bettedGame) return // TODO

    const gameWinner = this.getGameWinner(bettedGame)
    const bettedTeam = bet?.bettedTeam

    if(gameWinner === bettedTeam) {
        // veikkaus oikein
        await this.handleBetCorrect(bet)
    }
    bet.isOpen = false
    await bet.save()
  }

  async handleBetCorrect(bet: IBetItem): Promise<void> {
    const multiplier = bet?.multiplier || 1
    const amount = bet?.betAmount || 0

    const winAmount = (multiplier * amount) || 0

    const userId = bet?.userId

    const user =  await userService.findById(userId) as IUser

    const currentAmount = user?.balance || 0
    const newAmount = currentAmount + winAmount

    user.balance = newAmount
    await user.save()
  }

  private getGameWinner(game: SingleLiigaGame): 'homeTeam' | 'awayTeam' | 'tie' {
    if(game?.game?.finishedType !== 'ENDED_DURING_REGULAR_GAME_TIME') return 'tie'

    const goalsHomeTeam = game?.game?.homeTeam?.goals ?? 0
    const goalsAwayTeam = game?.game?.awayTeam?.goals ?? 0

    return goalsHomeTeam > goalsAwayTeam ? 'homeTeam' : 'awayTeam'
  }

  private async parseOutput(userIdList: string[]): Promise<string> {
    const users = await userService.findByIdList(userIdList)
    
    const list = users?.map(u => `${u?.name} | saldo: ${u?.balance} \n`)
    return list?.join('')
  }
}

export default new CheckOpenBetsUtil()