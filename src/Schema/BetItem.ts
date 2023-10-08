import mongoose, { Schema, Document } from "mongoose";

export interface IBetItem extends Document {
  userId: string;
  gameId: number;
  bettedTeam: string; // homeTeam, awayTeam, tie
  betAmount: number;
  multiplier: number
  isOpen: boolean
}

const BetItemSchema = new Schema<IBetItem>({
  userId: { type: String, required: true },
  gameId: { type: Number, required: true },
  bettedTeam: { type: String, required: true},
  betAmount: { type: Number, required: true },
  multiplier: { type: Number, required: true },
  isOpen: { type: Boolean, default: true },
});

const BetItem = mongoose.model<IBetItem>("BetItem", BetItemSchema);

export default BetItem;
