import { Request, Response, Router } from 'express'
import { blogsRepository } from '../repositories/blogs-repository'
import { db } from '../database'

export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response) => {
    const foundBlogs = blogsRepository.findBlogs(req.query.name?.toString())
    res.send(foundBlogs)
})

blogsRouter.get