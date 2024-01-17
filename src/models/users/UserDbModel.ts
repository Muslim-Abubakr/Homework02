import { ObjectId } from "mongodb"

export type UserDbType = {
    _id: ObjectId,
    id: string
    login: string
    email: string
    passwordSalt: string
    passwordHash: string
    createdAt: string
}

