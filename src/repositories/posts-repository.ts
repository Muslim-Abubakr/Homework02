import {Request, Response, Router} from 'express'
import { db } from '../db/database'
import { PostType } from '../models/types'

export const postsRepository = {
    async findPosts(): Promise<PostType[]> {
        return db.posts
    },

    async getPostsById(id: string | null | undefined): Promise<PostType | undefined> {
        let post = db.posts.find(p => p.id === id)
        return post;
    },

    async createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        const newPost = {
            id: String(+(new Date())),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName
        }
        
        db.posts.push(newPost)
        return newPost
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        const post = db.posts.find(p => p.id === id)
        
        if (post) {
            post.id = id
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.blogId = blogId
            post.blogName = blogName
            return true;
        } else {
            return false;
        }
    },

    async deletePost(id: string) {
        let post = db.posts.find(p => p.id === id)

        if (post) {
            db.posts = db.posts.filter(p => p.id !== id)
            return true
        } else {
            return false
        }
    }
}