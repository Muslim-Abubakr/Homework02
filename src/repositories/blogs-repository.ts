import { blogsCollection } from '../db/database'
import { BlogType } from '../models/types'
import { uid } from 'uid'

export const blogsRepository = {
    async findBlogs(name: string): Promise<BlogType[]> {
        const filter: any = {}

        if (name) {
            filter.name = {$regex: name}
        }

        return blogsCollection.find({}).toArray()
    },

    async getBlogsById(id: string | null | undefined): Promise<BlogType | null> {
        let blogs: BlogType | null = await blogsCollection.findOne({id: id})

        if (blogs) {
            return blogs
        } else {
            return null
        }
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogType | void> {
        const newBlog = {
            id: uid(),
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        try {
            await blogsCollection.insertOne(newBlog)
            return newBlog    
        } catch {
            return console.log('Error')
        }

    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const updateBlog = await blogsCollection.updateOne({id: id}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})
        return updateBlog.matchedCount === 1
    },

    async deleteBlog(id: string): Promise<boolean> {
        const deleteBlog = await blogsCollection.deleteOne({id: id})
        return deleteBlog.deletedCount === 1
    },

    async deleteAll(): Promise<boolean> {
        const result = await blogsCollection.deleteMany({})
        return result.deletedCount === 1
    }
}
