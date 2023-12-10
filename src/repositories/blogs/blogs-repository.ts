import { blogsCollection } from '../../db/database'
import { blogMapping } from '../../helpers/BlogMappingViews'
import { BlogDbType } from '../../models/types'
import { BlogModelOutType } from '../../models/types'
import { ObjectId } from 'mongodb'

export const blogsRepository = {
    async findBlogs(name: string): Promise<BlogModelOutType[]> {
        const filter: any = {}

        if (name) {
            filter.name = {$regex: name}
        }
        const blogs = await blogsCollection.find({}).toArray()
        return blogs.map(blog => blogMapping(blog)) 
    },

    async getBlogsById(id: string | null | undefined): Promise<BlogModelOutType | null> {
        const objectId = new ObjectId(String(id)) 
        let blog: BlogDbType | null = await blogsCollection.findOne({_id: objectId})

        if (blog) {
            return blogMapping(blog)
        } else {
            return null
        }
    },

    async createBlog(newBlog: BlogModelOutType): Promise<BlogModelOutType | void> {
        await blogsCollection.insertOne(newBlog)
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
