import { PostModelOutType, PostDbType, SortDataType} from '../models/types'
import { uid } from 'uid'
import { postsRepository } from '../repositories/posts/posts-repository'
import { ObjectId } from 'mongodb'
import { postMapping } from '../helpers/PostMappingViews'


export const postsService = {
    async createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<PostModelOutType> {
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
        await postsRepository.createPost(newPost)
        return postMapping(newPost)
        
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<boolean | null> {
        const post = await postsRepository.updatePost(id, title, shortDescription, content, blogId, blogName)
        return post
    },

    async deletePost(id: string): Promise<boolean | null> {
        const result = await postsRepository.deletePost(id)
        return result
    },

    async deleteAll() {
        const result = postsRepository.deleteAll
        return result
    }
}