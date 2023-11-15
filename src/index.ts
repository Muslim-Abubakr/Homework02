import express, { Request, Response, } from 'express'
import bodyParser from 'body-parser'
import { blogsRouter } from './routes/blogs-router'
import { postsRouter } from './routes/posts-router'
import { testsRouter } from './routes/testing-router'
import dotenv from 'dotenv'

const app = express()
const port = process.env.PORT || 3000
const parserMiddleware = bodyParser({})

dotenv.config()
const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
console.log(process.env.MONGO_URL)

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

