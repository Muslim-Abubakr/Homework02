import { PostType } from '../models/types'
import { postsCollection } from '../db/database'

export const postsRepository = {
    async findPosts(title: string): Promise<PostType[]> {
        if (title) {
            return postsCollection.find({name: {$regex: title}}).toArray()
        } else {
            return postsCollection.find({}).toArray()
        }
        
    },

    async getPostsById(id: number | string): Promise<PostType | null> {
        const post: PostType | null = await postsCollection.findOne({id: id})

        if (post) {
            return post
        } else {
            return null
        }
    },

    async createPost(_id:string, title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<PostType> {
        const newPost = {
            id: String(+(new Date())),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        
        await postsCollection.insertOne(newPost)
        return newPost
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<boolean> {
        const result = await postsCollection.updateOne({id: id}, {$set: {id: id, title: title, shortDescription: shortDescription, content: content, blogId: blogId, blogName: blogName}})
        return result.matchedCount === 1
    },

    async deletePost(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },

    async deleteAll(): Promise<boolean> {
        const result = await postsCollection.deleteMany({})
        return result.deletedCount === 1
    }
}