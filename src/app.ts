import express, { Request, Response } from 'express'
import { blogsRouter } from './routes/blogs-router'
import { postsRouter } from './routes/posts-router'
import { testsRouter } from './routes/testing-router'
import { runDb } from './db/database'
    
export const app = express()

const jsonBodyMiddleware = express.json()   
app.use(jsonBodyMiddleware)


const RouterPaths = {
    testing: '/testing',
    blogs: '/blogs',
    posts: '/posts'
}

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the main page')
})

app.use(RouterPaths.testing, testsRouter)

app.use(RouterPaths.blogs, blogsRouter)

app.use(RouterPaths.posts, postsRouter)




