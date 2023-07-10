import { Request, Response, Router } from 'express'
import { blogsRepository } from '../repositories/blogs-repository'
import { db } from '../database'

export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response) => {
    const foundBlogs = blogsRepository.findBlogs()
    res.send(foundBlogs)
})

blogsRouter.get('/:id', (req: Request, res: Response) => {
    const foundBlogs = blogsRepository.getBlogsById(req.params.id)

    if (foundBlogs) {
        res
            .status(200)
            .send(foundBlogs)
    } else {
        res.send(404)
    }
})

blogsRouter.post('/', (req: Request, res: Response) => {
    const { name, description, websiteUrl } = req.body
    const newBlog = blogsRepository.createBlog(name, description, websiteUrl)
    res
        .status(201)
        .send(newBlog)
})

blogsRouter.put('/', (req: Request, res: Response) => {
    
})