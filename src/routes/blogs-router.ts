import { Request, Response, Router } from 'express'
import { validationCreateUpdateBlog } from '../middlewares/blogs-validation'
import { authorizationMiddleware } from '../middlewares/authorization'
import { UriBlogsModel } from '../models/blogs/UriBlogsModel'
import { ViewBlogModel } from '../models/blogs/ViewBlogModel'
import { BlogType, ParamsType, RequestWithParamsAndBody, RequestWithParamsAndQuery, RequestWithQuery, RequestWithUriParams, SortDataType } from '../models/types'
import { HTTP_STATUSES } from '../statuses/statuses'
import { blogsService } from '../domain/blogs-service'
import { CreatePostBlogModel } from '../models/posts/PostCreateModel'
import { blogsRepository } from '../repositories/blogs/blogs-repository'
import { postsService } from '../domain/posts-service'
import { QueryPostByBlogIdInputModel } from '../models/blogs/input/query.blog.input.model'
import { validationCreateUpdatePostToBlog } from '../middlewares/post-to-blog-validation'
import { queryBlogsRepository } from '../repositories/blogs/queryBlogs-repository'


export const blogsRouter = Router({})

blogsRouter.get('/', async (req: RequestWithQuery<SortDataType>, res: Response) => {
    const sortData: {searchNameTerm: any, sortBy: any, sortDirection: any, pageNumber: any, pageSize: any} = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    }

    const foundBlogs = await queryBlogsRepository.getAllBlogs(sortData)
    res.send(foundBlogs)
})

blogsRouter.get('/:id', async (req: RequestWithUriParams<UriBlogsModel>, 
    res: Response<ViewBlogModel | Number>): Promise<void> => {
    const foundBlogs: BlogType | null = await queryBlogsRepository.getBlogsById(req.params.id)

    if (foundBlogs) {
        res
            .status(HTTP_STATUSES.OK200)
            .send(foundBlogs)
    } else {
        res.send(HTTP_STATUSES.NOT_FOUND_404)
    }
}),

blogsRouter.get('/:id/posts', async (req: RequestWithParamsAndQuery<ParamsType, QueryPostByBlogIdInputModel>, 
    res: Response): Promise<void> => {
    const id = req.params.id    

    const sortData: {sortBy: any, sortDirection: any, pageNumber: any, pageSize: any} = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    }

    const blog = await queryBlogsRepository.getBlogsById(id)

    if (!blog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    const posts = await queryBlogsRepository.getPostsByBlogId(id, sortData)

    if (posts) {
        res
            .status(HTTP_STATUSES.OK200)
            .send(posts)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
}),

blogsRouter.post('/', 
    authorizationMiddleware,
    validationCreateUpdateBlog,
    async (req: Request, res: Response<ViewBlogModel | void>) => {
        const { name, description, websiteUrl } = req.body
        const newBlog = await blogsService.createBlog(name, description, websiteUrl)
        res
            .status(HTTP_STATUSES.CREATED_201) 
            .send(newBlog)
}),

blogsRouter.post('/:id/posts', 
    authorizationMiddleware,
    validationCreateUpdatePostToBlog,
    async (req: RequestWithParamsAndBody<{id: string}, CreatePostBlogModel>, res: Response) => {
        const title = req.body.title
        const shortDescription = req.body.shortDescription
        const content = req.body.content

        const blogId = req.params.id

        const blog = await queryBlogsRepository.getBlogsById(blogId)

        if (!blog) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return;
        }

        const post  = await postsService.createPost(title, shortDescription, content, blogId, blog.name) //postService.createPost(...) 
        
        if (!post) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
            return;
        }

        res
            .status(HTTP_STATUSES.CREATED_201)
            .send(post)
})

blogsRouter.put('/:id',
    authorizationMiddleware, 
    validationCreateUpdateBlog,
    async (req: Request, res: Response<ViewBlogModel | null | Number>) => {
        const { name, description, websiteUrl} = req.body
        const isUpdated = await blogsService.updateBlog(req.params.id, name, description, websiteUrl)

        if (isUpdated) {
            const blog = await queryBlogsRepository.getBlogsById(req.params.id)
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
