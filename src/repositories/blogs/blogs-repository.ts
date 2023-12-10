import { blogsCollection } from '../../db/database'
import { blogMapping } from '../../helpers/BlogMappingViews'
import { BlogType } from '../../models/types'
import { BlogModelOutType } from '../../models/types'

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
        let blog: BlogType | null = await blogsCollection.findOne({id: id}, {projection: {_id: 0}})

        if (blog) {
            return blog
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
