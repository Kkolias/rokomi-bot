import BetItem, { IBetItem } from "../Schema/BetItem";
import mongoose from "mongoose";

export class BetService {
  async findAll(): Promise<IBetItem[]> {
    return await BetItem.find();
  }

  async findAllOpenBets(): Promise<IBetItem[]> {
    return await BetItem.find({ isOpen: true })
  }

  async findByGameId(gameId: number): Promise<IBetItem[]> {
    return await BetItem.find({ gameId });
  }

  async findByUserId(userId: number): Promise<IBetItem[]> {
    return await BetItem.find({ userId });
  }

  async createTestBest() {
    const betItem = {
      userId: '220887283342114816',
      gameId: 63,
      bettedTeam: 'awayTeam',
      betAmount: 420,
      multiplier: 2,
      // isOpen: true
    }
    await BetItem.create(betItem)
  }

  async create({
    userId,
    gameId,
    betAmount,
    multiplier,
    bettedTeam
  }: {
    userId: string;
    gameId: number;
    betAmount: number;
    multiplier: number;
    bettedTeam: string
  }): Promise<IBetItem> {
    return await BetItem.create({ userId, gameId, betAmount, multiplier, bettedTeam });
  }

  async update({
    _id,
    userId,
    gameId,
    betAmount,
    multiplier,
  }: {
    _id: string,
    userId?: string;
    gameId?: number;
    betAmount?: number;
    multiplier?: number;
  }) {
    const betItem = await BetItem.findOne({ _id: new mongoose.Types.ObjectId(_id)})

  }
}

export default new BetService();
