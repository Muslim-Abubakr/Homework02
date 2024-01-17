import { UserDbType } from "../models/users/UserDbModel";

export function userMapping(user: UserDbType) {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        passwordSalt: user.passwordSalt,
        passwordHash: user.passwordHash,
        createdAt: user.createdAt
    }
}

