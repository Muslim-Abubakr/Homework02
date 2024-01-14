import { PostModelOutType } from '../../models/types'
import { postsCollection } from '../../db/database'
import { ObjectId } from 'mongodb'

export const postsRepository = {
    async createPost(newPost: PostModelOutType): Promise<PostModelOutType | void> {
        await postsCollection.insertOne(newPost)
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<boolean | null> {
        try {
            const objectId = new ObjectId(String(id))
            const result = await postsCollection.updateOne({_id: objectId}, {$set: {id: id, title: title, shortDescription: shortDescription, content: content, blogId: blogId, blogName: blogName}})
            return result.matchedCount === 1
        } catch (error) {
            return null;
        }
    },

    async deletePost(id: string): Promise<boolean | null> {
        try {
            const objectId = new ObjectId(String(id))
            const result = await postsCollection.deleteOne({_id: objectId})
            return result.deletedCount === 1
        } catch (error) {

            return null;
        }
        
    },

    async deleteAll(): Promise<boolean> {
        const result = await postsCollection.deleteMany({})
        return result.deletedCount === 1
    }
}

