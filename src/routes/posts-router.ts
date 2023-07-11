import {Request, Response, Router} from 'express'
import { postsRepository } from '../repositories/posts-repository'
import { db } from '../database'
import { inputValidationMiddleware } from '../middlewares/input-validation-middlewares'
import { validationCreateUpdatePost } from '../middlewares/posts-validation'
import { authorizationMiddleware } from '../middlewares/authorization'


export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    const foundPosts = postsRepository.findPosts()
    res.send(foundPosts)
})

postsRouter.get('/:id', (req: Request, res: Response) => {
    const foundPosts = postsRepository.getPostsById(req.params.id)

    if (foundPosts) {
        res
            .status(200)
            .send(foundPosts)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.post('/',
authorizationMiddleware, 
validationCreateUpdatePost,
(req: Request, res: Response) => {
    const { title, shortDescription, content, blogId, blogName } = req.body
    const newPost = postsRepository.createPost(title, shortDescription, content, blogId, blogName)
    
    res
        .status(201)
        .send(newPost)
})

postsRouter.put('/:id',
authorizationMiddleware,
validationCreateUpdatePost,
(req: Request, res: Response) => {
    const { title, shortDescription, content, blogId, blogName } = req.body
    const isUpdated = postsRepository.updatePost(req.params.id, title, shortDescription, content, blogId, blogName)

    if (isUpdated) {
        const post = postsRepository.getPostsById(req.params.id)
        res.send(post)
    } else {
        res.status(404)
    }
})

postsRouter.delete('/:id',
authorizationMiddleware,
(req: Request, res: Response) => {
    const filteredPost = postsRepository.deletePost(req.params.id)
    filteredPost ? res.sendStatus(204): res.sendStatus(404)
})