import { usersCollection } from "../../db/database"
import { UserDbType } from "../../models/users/UserDbModel"


export const usersRepository = {

    async createUser(user: UserDbType): Promise<UserDbType> {
        await usersCollection.insertOne(user)
        return user
    },

    async updateUser() {
        
    },

    async deleteUser() {

    }
}
