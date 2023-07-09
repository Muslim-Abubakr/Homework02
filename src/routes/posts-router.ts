import {Request, Response, Router} from 'express'
import { postsRepository } from '../repositories/posts-repository'
import { db } from '../database'

export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    const foundBlogs = postsRepository.findPosts(req.query.title?.toString())
    res.send(foundBlogs)
})