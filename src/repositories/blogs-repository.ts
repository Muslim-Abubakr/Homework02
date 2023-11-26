import { blogsCollection } from '../db/database'
import { BlogType } from '../models/types'

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

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogType> {
        const newBlog = {
            id: (+(new Date())).toString(),
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        await blogsCollection.insertOne(newBlog, { writeConcern: { w: 1, j: true, wtimeout: 2000 }, forceServerObjectId: false })
        return newBlog
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
