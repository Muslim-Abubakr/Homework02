import { blogsCollection } from '../db/database'
import { BlogType } from '../models/types'
import { uid } from 'uid'
import { BlogModelOutType } from '../models/types'
import { blogsRepository } from '../repositories/blogs-repository'

export const blogsService = {
    async findBlogs(name: string): Promise<BlogModelOutType[]> {
        return blogsRepository.findBlogs(name)
    },

    async getBlogsById(id: string | null | undefined): Promise<BlogModelOutType | null> {
        return await blogsRepository.getBlogsById(id)
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

        await blogsRepository.createBlog(newBlog)
        let {_id, ...newBlogWithout_Id} = newBlog
        return newBlogWithout_Id
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const updateBlog = await blogsRepository.updateBlog(id, name, description, websiteUrl)
        return updateBlog
    },

    async deleteBlog(id: string): Promise<boolean> {
        const deleteBlog = await blogsRepository.deleteBlog(id)
        return deleteBlog        
    },

    async deleteAll() {
        const result = blogsRepository.deleteAll
        return result
    }
}