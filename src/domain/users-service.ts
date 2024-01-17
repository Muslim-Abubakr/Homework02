import { ObjectId } from "mongodb";
import { UserDbType } from "../models/users/UserDbModel";
import bcrypt from 'bcrypt'
import { uid } from "uid";
export const usersService = {
    async createUser(login: string, email: string, password: string): Promise<UserDbType> {

        const passwordSalt = await bcrypt.genSalt(12)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: UserDbType = {
            _id: new ObjectId,
            id: uid(),
            login: login,
            email: email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString()
        }

        return usersRepository.createUser(newUser)
    },
    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash;
    }
}