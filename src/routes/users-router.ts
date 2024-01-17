import { Request, Response, Router } from 'express'
import { HTTP_STATUSES } from '../statuses/statuses'


export const usersRouter = Router({})

usersRouter.post('/',
    async (req: Request, res: Response) => {
        const newProduct = await usersService.createUser(req.body.login, req.body.email, req.body.password)
        res
            .status(HTTP_STATUSES.CREATED_201)
            .send(newProduct)
})