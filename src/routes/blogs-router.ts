import { Request, Response, Router } from 'express'
import { blogsRepository } from '../repositories/blogs-repository'
import { validationCreateUpdateBlog } from '../middlewares/blogs-validation'
import { authorizationMiddleware } from '../middlewares/authorization'
import { UriBlogsModel } from '../models/UriBlogsModel'
import { ViewBlogModel } from '../models/ViewBlogModel'
import { BlogType, RequestWithQuery, RequestWithUriParams } from '../models/types'
import { BlogGetModel } from '../models/blogGetModel'
import { HTTP_STATUSES } from '../statuses/statuses'
import { getBlogViewModel } from '../models/blogsMapper/getBlogViewModel'

export const blogsRouter = Router({})

blogsRouter.get('/', async (req: RequestWithQuery<BlogGetModel>, res: Response<ViewBlogModel[]>) => {
    const foundBlogs: BlogType[] = await blogsRepository.findBlogs(req.query.name)
    res.send(foundBlogs.map(getBlogViewModel))
})

blogsRouter.get('/:id', async (req: RequestWithUriParams<UriBlogsModel>, 
    res: Response<ViewBlogModel | Number>) => {
    const foundBlogs = await blogsRepository.getBlogsById(req.params.id)

    if (foundBlogs) {
        res
            .status(HTTP_STATUSES.OK200)
            .send(foundBlogs)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
})

blogsRouter.post('/', 
    authorizationMiddleware,
    validationCreateUpdateBlog,
    async (req: Request, res: Response<ViewBlogModel | void>) => {
        const { name, description, websiteUrl } = req.body
        const newBlog = await blogsRepository.createBlog(name, description, websiteUrl)
        newBlog
        res
            .status(HTTP_STATUSES.CREATED_201) 
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
                .status(HTTP_STATUSES.NO_CONTENT_204)
                .send(blog)
        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
        
})

blogsRouter.delete('/:id',
    authorizationMiddleware,
    async (req: Request, res: Response) => {
        const filteredBlog = await blogsRepository.deleteBlog(req.params.id)
        filteredBlog ? res.send(HTTP_STATUSES.NO_CONTENT_204): res.send(HTTP_STATUSES.NOT_FOUND_404)
})