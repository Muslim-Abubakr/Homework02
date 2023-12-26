import { uid } from 'uid'
import { BlogDbType, BlogModelOutType, PostDbType, PostModelOutType, SortDataType } from '../models/types'
import { blogsRepository } from '../repositories/blogs/blogs-repository'
import { ObjectId } from 'mongodb'
import { blogMapping } from '../helpers/BlogMappingViews'
import { postsRepository } from '../repositories/posts/posts-repository'

export const blogsService = {
    async getAllBlogs(sortData: SortDataType) {
        return blogsRepository.getAllBlogs(sortData)
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

    async createPostToBlog(blogId: string, title: string, shortDescription: string, content: string, blogName: string
    ): Promise<PostModelOutType | void | null> {
        const blog: BlogModelOutType | null = await blogsRepository.getBlogsById(blogId)

        const newPost: PostDbType = {
            _id: new ObjectId,
            id: uid(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName,
            createdAt: new Date().toISOString()
        }
        

        const id = await postsRepository.createPost(newPost)

        if (!newPost) {
            return null
        }
       
        return newPost
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