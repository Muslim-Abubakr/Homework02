import { Request, Response, Router } from 'express'
import { blogsRepository } from '../repositories/blogs-repository'
import { validationCreateUpdateBlog } from '../middlewares/blogs-validation'
import { authorizationMiddleware } from '../middlewares/authorization'
import { UriBlogsModel } from '../models/UriBlogsModel'
import { ViewBlogModel } from '../models/ViewBlogModel'
import { BlogType, RequestWithQuery, RequestWithUriParams } from '../models/types'
import { BlogGetModel } from '../models/blogGetModel'

export const blogsRouter = Router({})

blogsRouter.get('/', async (req: RequestWithQuery<BlogGetModel>, res: Response<ViewBlogModel[]>) => {
    const foundBlogs: BlogType[] = await blogsRepository.findBlogs(req.query.name)
    res.send(foundBlogs)
})

blogsRouter.get('/:id', async (req: RequestWithUriParams<UriBlogsModel>, 
    res: Response<ViewBlogModel | Number>) => {
    const foundBlogs = await blogsRepository.getBlogsById(req.params.id)

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
    async (req: Request, res: Response<ViewBlogModel>) => {
        const { name, description, websiteUrl } = req.body
        const newBlog = await blogsRepository.createBlog(name, description, websiteUrl)
        res
            .status(201) 
            .send(newBlog)
})

blogsRouter.put('/:id',
    authorizationMiddleware, 
    validationCreateUpdateBlog,
    async (req: Request, res: Response<ViewBlogModel | null | Number>) => {
        const { name, description, websiteUrl} = req.body
        const isUpdated = await blogsRepository.updateBlog(req.params.id, name, description, websiteUrl)

        if (isUpdated) {
            const blog = await blogsRepository.getBlogsById(req.params.id)
            res
                .status(204)
                .send(blog)
        } else {
            res.send(404)
        }
})

blogsRouter.delete('/:id',
    authorizationMiddleware,
    async (req: Request, res: Response) => {
        const filteredBlog = await blogsRepository.deleteBlog(req.params.id)
        filteredBlog ? res.send(204): res.send(404)
})