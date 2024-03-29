import { Request, Response, Router } from 'express'
import { validationCreateUpdatePost } from '../middlewares/posts-validation'
import { authorizationMiddleware } from '../middlewares/authorization'
import { PostType, RequestWithBody, RequestWithParamsAndBody, RequestWithQuery, RequestWithUriParams, SortDataType } from '../models/types'
import { UriPostsIdModel } from '../models/posts/UriPostsIdModel'
import { ViewPostModel } from '../models/posts/ViewPostModel'
import { BlogType } from '../models/types'
import { PostCreateInputModel } from '../models/posts/PostCreateModel'
import { PostUpdateInputModel } from '../models/posts/PostUpdateModel'
import { HTTP_STATUSES } from '../statuses/statuses'
import { postsService } from '../domain/posts-service'
import { queryBlogsRepository } from '../repositories/blogs/queryBlogs-repository'
import { queryPostsRepository } from '../repositories/posts/queryPosts-repository'


export const postsRouter = Router({})

postsRouter.get('/', async (req: RequestWithQuery<SortDataType>, res: Response) => {
    const sortData: { sortBy: any, sortDirection: any, pageNumber: any, pageSize: any} = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    }

    const foundPosts = await queryPostsRepository.getAllPosts(sortData)
    res.send(foundPosts)
})

postsRouter.get('/:id', async (req: RequestWithUriParams<UriPostsIdModel>, res: Response<ViewPostModel>) => {
    const foundPosts: PostType | null = await queryPostsRepository.getPostsById(req.params.id)

    if (foundPosts) {
        res
            .status(HTTP_STATUSES.OK200)    
            .send(foundPosts)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})  

postsRouter.post('/',
    authorizationMiddleware, 
    validationCreateUpdatePost, 
    async (req: RequestWithBody<PostCreateInputModel>, res: Response<ViewPostModel>) => {
        const { title, shortDescription, content, blogId } = req.body
        const blog : BlogType | null = await queryBlogsRepository.getBlogsById(blogId)
        if (!blog){
            return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        }
        const newPost = await postsService.createPost(title, shortDescription, content, blogId, blog.name)
        
        res
            .status(HTTP_STATUSES.CREATED_201)
            .send(newPost)
})

postsRouter.put('/:id',
    authorizationMiddleware,
    validationCreateUpdatePost,
    async (req: RequestWithParamsAndBody<UriPostsIdModel, PostUpdateInputModel>, res: Response) => {
        
        const { title, shortDescription, content, blogId } = req.body
        const blog: BlogType | null = await queryBlogsRepository.getBlogsById(blogId)

        if (!blog){
            return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        }

        const isUpdated = await postsService.updatePost(req.params.id, title, shortDescription, content, blogId, blog.name)

        if (isUpdated) {
            const post = await queryPostsRepository.getPostsById(blogId)
            res
                .status(HTTP_STATUSES.NO_CONTENT_204)
                .send(post)
        } else {
            res.send(HTTP_STATUSES.NOT_FOUND_404)
        }
})

postsRouter.delete('/:id',
    authorizationMiddleware,
    async (req: Request, res: Response) => {
        const filteredPost = await postsService.deletePost(req.params.id)
        filteredPost ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204): res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})

