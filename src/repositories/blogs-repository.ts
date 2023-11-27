import { blogsCollection } from '../db/database'
import { BlogType } from '../models/types'
import { uid } from 'uid'
import { BlogModelOutType } from '../models/types'

export const blogsRepository = {
    async findBlogs(name: string): Promise<BlogModelOutType[]> {
        const filter: any = {}

        if (name) {
            filter.name = {$regex: name}
        }
        const blogs = blogsCollection.find({}, {projection: {_id: 0}}).toArray()
        return blogs
    },

    async getBlogsById(id: string | null | undefined): Promise<BlogModelOutType | null> {
        let blog: BlogType | null = await blogsCollection.findOne({id: id}, {projection: {_id: 0}})

        if (blog) {
            return blog
        } else {
            return null
        }
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogModelOutType | void> {
        const newBlog: BlogModelOutType = {
            id: uid(),
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        await blogsCollection.insertOne(newBlog)
        let {_id, ...newBlogWithout_Id} = newBlog
        return newBlogWithout_Id
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
