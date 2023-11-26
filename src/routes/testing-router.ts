import { Request, Response, Router } from 'express'
import { blogsRepository } from '../repositories/blogs-repository'
import { postsRepository } from '../repositories/posts-repository'
import { HTTP_STATUSES } from '../statuses/statuses'

export const testsRouter = Router({})

testsRouter.delete('/all-data', async (req: Request, res: Response) => {
    blogsRepository.deleteAll()
    postsRepository.deleteAll()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})