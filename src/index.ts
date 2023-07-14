import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { blogsRouter } from './routes/blogs-router'
import { postsRouter } from './routes/posts-router'
import { db } from './database'
import { HTTP_STATUSES } from './database'


const app = express()
const port = process.env.PORT || 3000
const parserMiddleware = bodyParser({})

app.use(parserMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the main page')
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.posts = []
    db.blogs = []
    res.sendStatus(204)
})

app.use('/blogs', blogsRouter)

app.use('/posts', postsRouter)

app.listen(port, () => {
    console.log(`Example app listening onn port ${port}`)
})

