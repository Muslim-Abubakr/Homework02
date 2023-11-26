import express, { Request, Response, NextFunction } from 'express'
import { blogsRouter } from './routes/blogs-router'
import { postsRouter } from './routes/posts-router'
import { testsRouter } from './routes/testing-router'
import { runDb } from './db/database'
import bodyParser from 'body-parser'

const app = express()

const jsonBodyMiddleware = express.json()   
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 3000

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

const startApp = async() => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()


