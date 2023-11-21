import express, { Request, Response } from 'express'
import { blogsRouter } from './routes/blogs-router'
import { postsRouter } from './routes/posts-router'
import { testsRouter } from './routes/testing-router'
import { runDb } from './db/database'


const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the main page')
})

app.use('/testing', testsRouter)

app.use('/blogs', blogsRouter)

app.use('/posts', postsRouter)


const startApp = async() => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()


