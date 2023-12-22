import { uid } from 'uid'
import { BlogDbType, BlogModelOutType } from '../models/types'
import { blogsRepository } from '../repositories/blogs/blogs-repository'
import { ObjectId } from 'mongodb'
import { blogMapping } from '../helpers/BlogMappingViews'

export const blogsService = {
    async getAllBlogs(): Promise<BlogModelOutType[]> {
        return blogsRepository.getAllBlogs()
    },

    async getBlogsById(id: string | null | undefined): Promise<BlogModelOutType | null> {
        return await blogsRepository.getBlogsById(id)
    },

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogModelOutType | void> {
        const newBlog: BlogDbType = {
            _id: new ObjectId(),
            id: uid(),
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        await blogsRepository.createBlog(newBlog)
        return blogMapping(newBlog)
       
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean | null> {
        const updateBlog = await blogsRepository.updateBlog(id, name, description, websiteUrl)
        return updateBlog
    },

    async deleteBlog(id: string): Promise<boolean | null> {
        const deleteBlog = await blogsRepository.deleteBlog(id)
        return deleteBlog        
    },

    async deleteAll() {
        const result = blogsRepository.deleteAll
        return result
    }
}