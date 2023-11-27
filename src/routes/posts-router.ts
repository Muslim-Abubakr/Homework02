import { Request, Response, Router } from 'express'
import { postsRepository } from '../repositories/posts-repository'
import { validationCreateUpdatePost } from '../middlewares/posts-validation'
import { authorizationMiddleware } from '../middlewares/authorization'
import { PostType, RequestWithBody, RequestWithParamsAndBody, RequestWithQuery, RequestWithUriParams } from '../models/types'
import { blogsRepository } from '../repositories/blogs-repository'
import { PostGetModel } from '../models/postGetModel'
import { UriPostsIdModel } from '../models/UriPostsIdModel'
import { ViewPostModel } from '../models/ViewPostModel'
import { BlogType } from '../models/types'
import { PostCreateInputModel } from '../models/PostCreateModel'
import { PostUpdateInputModel } from '../models/PostUpdateModel'
import { HTTP_STATUSES } from '../statuses/statuses'
import { getPostsViewModel } from '../models/postsMapper/getPostViewModel'

export const postsRouter = Router({})

postsRouter.get('/', async (req: RequestWithQuery<PostGetModel>, res: Response<ViewPostModel[]>) => {
    const foundPosts: PostType[] = await postsRepository.findPosts(req.query.title)
    res
        .status(HTTP_STATUSES.OK200)
        .send(foundPosts.map(getPostsViewModel))
})

postsRouter.get('/:id', async (req: RequestWithUriParams<UriPostsIdModel>, res: Response<ViewPostModel>) => {
    const foundPosts: PostType | null = await postsRepository.getPostsById(req.params.id)

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
        const blog : BlogType | null = await blogsRepository.getBlogsById(blogId)
        if (!blog){
            return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        }
        const newPost = await postsRepository.createPost(title, shortDescription, content, blogId, blog.name)
        
        res
            .status(HTTP_STATUSES.CREATED_201)
            .send(newPost)
})

postsRouter.put('/:id',
    authorizationMiddleware,
    validationCreateUpdatePost,
    async (req: RequestWithParamsAndBody<UriPostsIdModel, PostUpdateInputModel>, res: Response) => {
        
        const { title, shortDescription, content, blogId } = req.body
        const blog: BlogType | null = await blogsRepository.getBlogsById(blogId)

        if (!blog){
            return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        }

        const isUpdated = await postsRepository.updatePost(req.params.id, title, shortDescription, content, blogId, blog.name)

        if (isUpdated) {
            const post = await postsRepository.getPostsById(blogId)
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
        const filteredPost = await postsRepository.deletePost(req.params.id)
        filteredPost ? res.sendStatus(HTTP_STATUSES.NO_CONTENT_204): res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})

