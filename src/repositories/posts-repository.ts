import {Request, Response, Router} from 'express'
import { db } from '../database'


export const postsRepository = {
    findPosts(title: string | null | undefined) {
        if (title) {
            let filteredPosts = db.blogs.filter(b => b.name.indexOf(title) > -1)
            return filteredPosts
        } else {
            return db.posts
        }
    }
}