import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  id: String;
  balance: Number;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  id: { type: String, required: true },
  balance: { type: Number, default: 0 },
});

const UserItem = mongoose.model<IUser>("UserItem", UserSchema);

export default UserItem;
