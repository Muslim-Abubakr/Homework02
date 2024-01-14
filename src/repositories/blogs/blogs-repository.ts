import { blogsCollection, postsCollection } from '../../db/database'
import { CreatePostBlogModel } from '../../models/posts/PostCreateModel'
import { PostType } from '../../models/types'
import { BlogModelOutType } from '../../models/types'
import { ObjectId } from 'mongodb'
import { queryBlogsRepository } from './queryBlogs-repository'

export const blogsRepository = {
    async createBlog(newBlog: BlogModelOutType): Promise<BlogModelOutType | void> {
        await blogsCollection.insertOne(newBlog)
    },

    async createPostToBlog(blogId: string, postData: CreatePostBlogModel): Promise <any> {
        const blog = await queryBlogsRepository.getBlogsById(blogId)

        const post: PostType = {
            id: postData.id,
            title: postData.title,
            shortDescription: postData.shortDescription,
            content: postData.content,
            blogId: blogId,
            blogName: blog!.name,
            createdAt: postData.createdAt
        }

        const res = await postsCollection.insertOne(post)

        return res.insertedId
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean | null> {

        try {
            if (!ObjectId.isValid(id)) {
                return null;
            }

            const objectId = new ObjectId(String(id)) 
            const updateBlog = await blogsCollection.updateOne({_id: objectId}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})
            return updateBlog.matchedCount === 1
        } catch (error) {
            return null;
        }
    },

    async deleteBlog(id: string): Promise<boolean | null> {
        try {
            const objectId = new ObjectId(String(id)) 
            const deleteBlog = await blogsCollection.deleteOne({_id: objectId})
            return deleteBlog.deletedCount === 1
        } catch (error) {
            return null;
        }
    },

    async deleteAll(): Promise<boolean> {
        const result = await blogsCollection.deleteMany({})
        return result.deletedCount === 1
    }
}

