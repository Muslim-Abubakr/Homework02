import { Express, Request, Response, NextFunction } from 'express'

export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization

    if (!auth) {
        return res.sendStatus(401)
    }

    if (auth !== 'YWRtaW46cXdlcnR5') {
        return res.sendStatus(401)
    }

    next()
}

