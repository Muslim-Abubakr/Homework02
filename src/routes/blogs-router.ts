import { Request, Response, Router } from 'express'
import { blogsRepository } from '../repositories/blogs-repository'
import { db } from '../database'
import { inputValidationMiddleware } from '../middlewares/input-validation-middlewares'
import { validationCreateUpdateBlog } from '../middlewares/blogs-validation'
import { authorizationMiddleware } from '../middlewares/authorization'

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

blogsRouter.post('/', 
    authorizationMiddleware,
    validationCreateUpdateBlog,
    (req: Request, res: Response) => {
        const { name, description, websiteUrl } = req.body
        const newBlog = blogsRepository.createBlog(name, description, websiteUrl)
        res
            .status(201) 
            .send(newBlog)
})

blogsRouter.put('/:id',
    authorizationMiddleware, 
    validationCreateUpdateBlog,
    (req: Request, res: Response) => {
        const { name, description, websiteUrl} = req.body
        const isUpdated = blogsRepository.updateBlog(req.params.id, name, description, websiteUrl)

        if (isUpdated) {
            const blog = blogsRepository.getBlogsById(req.params.id)
            res
                .status(204)
                .send(blog)
        } else {
            res.send(404)
        }
})

blogsRouter.delete('/:id',
    authorizationMiddleware,
    (req: Request, res: Response) => {
        const filteredBlog = blogsRepository.deleteBlog(req.params.id)
        filteredBlog ? res.sendStatus(204): res.sendStatus(404)
})