import { Request, Response, NextFunction } from 'express'

export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization
    console.log(req.body, "body")
    if (!auth) {
        return res.sendStatus(401)
    } else if (auth !== 'Basic YWRtaW46cXdlcnR5') {
        return res.sendStatus(401)
    } else {
        return next()
    }
}

