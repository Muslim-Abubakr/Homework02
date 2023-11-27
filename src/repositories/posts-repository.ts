import { PostType, PostModelOutType } from '../models/types'
import { postsCollection } from '../db/database'
import { uid } from 'uid'


export const postsRepository = {
    async findPosts(title: string): Promise<PostModelOutType[]> {
        const filter: any = {}

        if (title) {
            filter.title = {$regex: title}
        }

        const posts = postsCollection.find({}, {projection: {_id: 0}}).toArray()
        return posts
    },

    async getPostsById(id: number | string): Promise<PostModelOutType | null> {
        const post: PostType | null = await postsCollection.findOne({id: id}, {projection: {_id: 0}})

        if (post) {
            return post
        } else {
            return null
        }
    },

    async createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<PostType> {
        const newPost: PostModelOutType = {
            id: uid(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName,
            createdAt: new Date().toISOString()
        }
        await postsCollection.insertOne(newPost)
        let {_id, ...newPostWithoud_id} = newPost
        return newPostWithoud_id
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