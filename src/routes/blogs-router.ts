import { Request, Response, Router } from 'express'
import { validationCreateUpdateBlog } from '../middlewares/blogs-validation'
import { authorizationMiddleware } from '../middlewares/authorization'
import { UriBlogsModel } from '../models/UriBlogsModel'
import { ViewBlogModel } from '../models/ViewBlogModel'
import { BlogType, RequestWithQuery, RequestWithUriParams, SortDataType } from '../models/types'
import { HTTP_STATUSES } from '../statuses/statuses'
import { blogsService } from '../domain/blogs-service'
import { validationCreateUpdatePost } from '../middlewares/posts-validation'


export const blogsRouter = Router({})


blogsRouter.get('/', async (req: RequestWithQuery<SortDataType>, res: Response) => {
    const sortData: {searchNameTerm: any, sortBy: any, sortDirection: any, pageNumber: any, pageSize: any} = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    }

    const foundBlogs = await blogsService.getAllBlogs(sortData)
    res.send(foundBlogs)
})

blogsRouter.get('/:id', async (req: RequestWithUriParams<UriBlogsModel>, 
    res: Response<ViewBlogModel | Number>): Promise<void> => {
    const foundBlogs: BlogType | null = await blogsService.getBlogsById(req.params.id)

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
        const newBlog = await blogsService.createBlog(name, description, websiteUrl)
        res
            .status(HTTP_STATUSES.CREATED_201) 
            .send(newBlog)
})

blogsRouter.post('/:id/posts', 
    authorizationMiddleware,
    validationCreateUpdatePost,
    async (req: Request, res: Response<ViewBlogModel | void>) => {
        const { name, description, websiteUrl } = req.body
        const newBlog = await blogsService.createBlog(name, description, websiteUrl)
        res
            .status(HTTP_STATUSES.CREATED_201) 
            .send(newBlog)
})

blogsRouter.put('/:id',
    authorizationMiddleware, 
    validationCreateUpdateBlog,
    async (req: Request, res: Response<ViewBlogModel | null | Number>) => {
        const { name, description, websiteUrl} = req.body
        const isUpdated = await blogsService.updateBlog(req.params.id, name, description, websiteUrl)

        if (isUpdated) {
            const blog = await blogsService.getBlogsById(req.params.id)
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
        const filteredBlog = await blogsService.deleteBlog(req.params.id)
        
        if (filteredBlog) {
            res.send(HTTP_STATUSES.NO_CONTENT_204)
        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
})
