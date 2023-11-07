import {Request, Response, Router} from 'express'
import { db } from '../db/database'


export const blogsRepository = {
    findBlogs() {
        return db.blogs
    },

    getBlogsById(id: string | null | undefined) {
        let blog = db.blogs.find(b => b.id === id)
        return blog;
    },

    createBlog(name: string, description: string, websiteUrl: string) {
        const newBlog = {
            id: (+(new Date())).toString(),
            name,
            description,
            websiteUrl
        }
        
        db.blogs.push(newBlog)
        return newBlog
    },

    updateBlog(id: string, name: string, description: string, websiteUrl: string) {
        const blog = db.blogs.find(b => b.id === id)
        
        if (blog) {
            blog.name = name
            blog.description = description
            blog.websiteUrl = websiteUrl
            return true;
        } else {
            return false;
        }
    },

    deleteBlog(id: string) {
        let blog = db.blogs.find(b => b.id === id)

        if (blog) {
            db.blogs = db.blogs.filter(b => b.id !== id)
            return true
        } else {
            return false
        }
    }
}
