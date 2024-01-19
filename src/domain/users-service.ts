import { ObjectId } from "mongodb";
import { UserDbType } from "../models/users/UserDbModel";
import bcrypt from 'bcrypt'
import { uid } from "uid";
import { usersRepository } from "../repositories/users/users-repository";
import { queryUsersRepository } from "../repositories/users/queryUsers-repository";

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

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await queryUsersRepository.findByLoginOrEmail(loginOrEmail)

        if (!user) return false

        const passwordHash = await this._generateHash(password, user.passwordSalt)

        if (user.passwordHash !== passwordHash) {
            return false
        }

        return true
    },

    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash;
    }
}