import { Request, Response, Router } from 'express'
import { HTTP_STATUSES } from '../statuses/statuses'
import { usersService } from '../domain/users-service'
import { usersRepository } from '../repositories/users/users-repository'
import { queryUsersRepository } from '../repositories/users/queryUsers-repository'


export const usersRouter = Router({})

usersRouter.get('/',
    async(req: Request, res: Response) => {
        const sortData: { sortBy: any, sortDirection: any, pageNumber: any, pageSize: any} = {
            sortBy: req.query.sortBy,
            sortDirection: req.query.sortDirection,
            pageNumber: req.query.pageNumber,
            pageSize: req.query.pageSize
        }

        const user = await queryUsersRepository.getAllUsers(sortData)

        res.send(user)
    }   
)
usersRouter.post('/',
    async(req: Request, res: Response) => {
        const newUser = await usersService.createUser(req.body.login, req.body.email, req.body.password)
        res
            .status(HTTP_STATUSES.CREATED_201)
            .send(newUser)
})