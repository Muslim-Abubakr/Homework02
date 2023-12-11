import { PostModelOutType, PostDbType } from '../../models/types'
import { postsCollection } from '../../db/database'
import { postMapping } from '../../helpers/PostMappingViews'
import { ObjectId } from 'mongodb'

export const postsRepository = {
    async findPosts(title: string): Promise<PostModelOutType[]> {
        const filter: any = {}

        if (title) {
            filter.title = {$regex: title}
        }

        const posts = await postsCollection.find({}).toArray()
        return posts.map(post => postMapping(post))
    },

    async getPostsById(id: number | string): Promise<PostModelOutType | null> {
        if (!id) {
            return null
        }

        try {
            if (!ObjectId.isValid(id)) {
                console.error("Неверный формат ID:", id);
                return null;
            }
            const objectId = new ObjectId(String(id))
            const post: PostDbType | null = await postsCollection.findOne({_id: objectId})
            return post ? postMapping(post) : null
        } catch (error) {
            console.error("Ошибка при получении блога по ID:", error);
            return null;
        }
    },

    async createPost(newPost: PostModelOutType): Promise<PostModelOutType | void> {
        await postsCollection.insertOne(newPost)
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<boolean | null> {
        try {
            const objectId = new ObjectId(String(id))
            const result = await postsCollection.updateOne({_id: objectId}, {$set: {id: id, title: title, shortDescription: shortDescription, content: content, blogId: blogId, blogName: blogName}})
            return result.matchedCount === 1
        } catch (error) {
            console.error("Ошибка при получении блога по ID:", error);
            return null;
        }
    },

    async deletePost(id: string): Promise<boolean | null> {
        try {
            const objectId = new ObjectId(String(id))
            const result = await postsCollection.deleteOne({_id: objectId})
            return result.deletedCount === 1
        } catch (error) {
            console.error("Ошибка при удалении поста по ID:", error);
            return null;
        }
        
    },

    async deleteAll(): Promise<boolean> {
        const result = await postsCollection.deleteMany({})
        return result.deletedCount === 1
    }
}