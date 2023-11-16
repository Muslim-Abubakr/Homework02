import { Request, Response, Router } from 'express'
import { postsRepository } from '../repositories/posts-repository'
import { db } from '../db/database'
import { validationCreateUpdatePost } from '../middlewares/posts-validation'
import { authorizationMiddleware } from '../middlewares/authorization'
import { PostType } from '../models/types'

export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response<PostType[]>) => {
    const foundPosts = await postsRepository.findPosts()
    res
        .status(200)
        .send(foundPosts)
})

postsRouter.get('/:id', async (req: Request, res: Response) => {
    const foundPosts = await postsRepository.getPostsById(req.params.id)

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
    async (req: Request, res: Response) => {
        const { title, shortDescription, content, blogId } = req.body
        const blog = db.blogs.find(b => b.id === blogId)
        const newPost = await postsRepository.createPost(title, shortDescription, content, blogId, blog!.name)
        
        res
            .status(201)
            .send(newPost)
})

postsRouter.put('/:id',
    authorizationMiddleware,
    validationCreateUpdatePost,
    async (req: Request, res: Response) => {
        
        const { title, shortDescription, content, blogId } = req.body
        const blog = db.blogs.find(b => b.id === blogId)
        const isUpdated = await postsRepository.updatePost(req.params.id, title, shortDescription, content, blogId, blog!.name)

        if (isUpdated) {
            const post = await postsRepository.getPostsById(req.params.id)
            res
                .status(204)
                .send(post)
        } else {
            res.send(404)
        }
})

postsRouter.delete('/:id',
    authorizationMiddleware,
    async (req: Request, res: Response) => {
        const filteredPost = await postsRepository.deletePost(req.params.id)
        filteredPost ? res.sendStatus(204): res.sendStatus(404)
})