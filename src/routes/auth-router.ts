import { Request, Response, Router } from 'express'
import { usersService } from '../domain/users-service'
import { HTTP_STATUSES } from '../statuses/statuses'

export const authRouter = Router({})

authRouter.post('/login',
    async (req: Request, res: Response) => {
        const checkResult = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
        res.status(HTTP_STATUSES.OK200)
    })