import { User } from "discord.js";


export default function userIsBot(author: User): boolean {
    return !!author.bot
}