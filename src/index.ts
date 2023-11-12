import express, { Request, Response, } from 'express'
import bodyParser from 'body-parser'
import { blogsRouter } from './routes/blogs-router'
import { postsRouter } from './routes/posts-router'
import { testsRouter } from './routes/testing-router'


const app = express()
const port = process.env.PORT || 3000
const parserMiddleware = bodyParser({})

app.use(parserMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the main page')
})

app.use('/testing', testsRouter)

app.use('/blogs', blogsRouter)

app.use('/posts', postsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

