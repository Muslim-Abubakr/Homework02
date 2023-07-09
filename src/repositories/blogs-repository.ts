import {Request, Response, Router} from 'express'
import { db } from '../database'


export const blogsRepository = {
    findBlogs(name: string | null | undefined) {
        if (name) {
            let filteredBlogs = db.blogs.filter(b => b.name.indexOf(name) > -1)
            return filteredBlogs
        } else {
            return db.blogs
        }
    },

    getBlogsById(id: string | null | undefined) {
        let blog = db.blogs.find(b => b.id === id)
        return blog;
    },

    createBlog(id: string, name: string, description: string, websiteUrl: string) {
        const newBlog = {
            id: String(+(new Date())),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        
        db.blogs.push(newBlog)
    },

    updateBlog(id: string, name: string, description: string, websiteUrl: string) {
        let blog = db.blogs.find(b => b.id === id)
        
        if (blog) {
            db.blogs.id = id
        }
}

