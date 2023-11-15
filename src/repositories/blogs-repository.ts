import { db } from '../db/database'
import { BlogType } from '../models/types'


export const blogsRepository = {
    async findBlogs(): Promise<BlogType[]> {
        return db.blogs
    },

    async getBlogsById(id: string | null | undefined): Promise<BlogType | undefined> {
        let blog = db.blogs.find(b => b.id === id)
        return blog;
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogType> {
        const newBlog = {
            id: (+(new Date())).toString(),
            name,
            description,
            websiteUrl
        }
        
        db.blogs.push(newBlog)
        return newBlog
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
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
