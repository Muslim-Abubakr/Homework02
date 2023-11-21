import { Request, Response, Router } from 'express'
import { blogsRepository } from '../repositories/blogs-repository'
import { postsRepository } from '../repositories/posts-repository'

export const testsRouter = Router({})

testsRouter.delete('/all-data', async (req: Request, res: Response) => {
    blogsRepository.deleteAll()
    postsRepository.deleteAll()
    res.sendStatus(204)
})