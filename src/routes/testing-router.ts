import { Request, Response, Router } from 'express'
import { db } from '../db/database'

export const testsRouter = Router({})

testsRouter.delete('/all-data', (req: Request, res: Response) => {
    db.blogs = []
    db.posts = []
    res.sendStatus(204)
})