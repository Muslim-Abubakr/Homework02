import { UserDbType } from "../../models/users/UserDbModel";
import bcrypt from 'bcrypt'

export const usersService = {
    async createUser(login: string, email: string, password: string): Promise<UserDbType> {

        const passwordSalt = await bcrypt 
    }
}