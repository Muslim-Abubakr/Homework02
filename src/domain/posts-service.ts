import { PostType, PostModelOutType } from '../models/types'
import { postsCollection } from '../db/database'
import { uid } from 'uid'
import { postsRepository } from '../repositories/posts-repository'


export const postsService = {
    async findPosts(title: string): Promise<PostModelOutType[]> {
        return postsRepository.findPosts(title)
    },

    async getPostsById(id: number | string): Promise<PostModelOutType | null> {
        return await postsRepository.getPostsById(id)
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
        await postsRepository.createPost(newPost)
        let {_id, ...newPostWithoud_id} = newPost
        return newPostWithoud_id
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<boolean> {
        const post = await postsRepository.updatePost(id, title, shortDescription, content, blogId, blogName)
        return post
    },

    async deletePost(id: string): Promise<boolean> {
        const result = await postsRepository.deletePost(id)
        return result
    },

    async deleteAll(){
        const result = postsRepository.deleteAll
        return result
    }
}