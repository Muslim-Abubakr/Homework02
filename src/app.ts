import express, { Request, Response } from 'express'
import { blogsRouter } from './routes/blogs-router'
import { postsRouter } from './routes/posts-router'
import { testsRouter } from './routes/testing-router'
import { usersRouter } from './routes/users-router'
import { authRouter } from './routes/auth-router'
    
export const app = express()

const jsonBodyMiddleware = express.json()   
app.use(jsonBodyMiddleware)

const RouterPaths = {
    testing: '/testing',
    blogs: '/blogs',
    posts: '/posts',
    users: '/users',
    login: '/login'
}

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the main page')
})

app.use(RouterPaths.testing, testsRouter)

app.use(RouterPaths.blogs, blogsRouter)

app.use(RouterPaths.posts, postsRouter)

app.use(RouterPaths.users, usersRouter)

app.use(RouterPaths.login, authRouter)




