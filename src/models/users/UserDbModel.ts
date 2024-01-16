import { ObjectId } from "mongodb"

export type UserDbModel = {
    _id: ObjectId,
    id: string
    login: string
    email: string
    createdAt: string
}

