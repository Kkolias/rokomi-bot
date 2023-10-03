import { User } from "discord.js";
import UserItem, { IUser } from "../Schema/User";

export class UserService {
  async findById(id: string): Promise<IUser | null> {
    return await UserItem.findOne({ id });
  }

  async getUserById(id: string): Promise<IUser | null> {
    const r = await UserItem.findOne({ id });
    if (!r) return null;
    return r;
  }

  async createUser({
    id,
    name,
  }: {
    id: string;
    name: string;
  }): Promise<{ user: IUser | null; error: string | null }> {
    await UserItem.create({ id, name, balance: 999 });

    const user = await UserItem.findOne({ id });
    if (!user) {
      return { user: null, error: "Jotain meni pieleen.. jännä :/" };
    }
    return { user, error: null };
  }

  async findByIdOrCreate(
    discordUser: User
  ): Promise<{ user: IUser | null; error: string | null }> {
    const id = discordUser?.id;

    const foundUser = await this.getUserById(id);

    if (foundUser) return { user: foundUser, error: null };

    const name = discordUser?.globalName || "NO_USER_NAME";
    return await this.createUser({ id, name });
  }

  async addBalance(
    amount: number,
    id: string
  ): Promise<{ error: string | null; user: IUser | null }> {
    const user = await this.findById(id);
    if (!user) return { error: "käyttäjää ei löytynyt", user: null };

    const currentBalance = (user?.balance || 0) as number;
    const newBalance = currentBalance + amount;

    user.balance = newBalance;
    await user.save();

    const updatedUser = await UserItem.findOne({ id });
    return { user: updatedUser, error: null };
  }

  async decrementBalance(
    amount: number,
    id: string
  ): Promise<{ error: string | null; user: IUser | null }> {
    return await this.addBalance(-amount, id);
  }

  async handleAddBalanceToUser(
    discordUser: User,
    amount: number
  ): Promise<string> {
    const uId = discordUser?.id;

    if (uId !== "220887283342114816") {
      const { user, error } = await this.decrementBalance(amount, uId);

      if(error) return error

      return `selvä! vähennetään ${amount} balancesta. uusi balance: ${user?.balance}`
    }

    const { user, error } = await this.addBalance(amount, uId);

    if(error) return error

    return `selvä! lisätään ${amount} balanceen. uusi balance: ${user?.balance}`

  }
}

export default new UserService();
