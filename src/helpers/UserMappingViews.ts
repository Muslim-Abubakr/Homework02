import { UserDbModel } from "../models/users/UserDbModel";

export function userMapping(user: UserDbModel) {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt
    }
}

