import {Request, Response, Router} from 'express'
import { db } from '../database'


export const postsRepository = {
    findPosts() {
        return db.posts
    },

    getPostsById(id: string | null | undefined) {
        let post = db.posts.find(p => p.id === id)
        return post;
    },

    createPost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
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

    updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string) {
        let post = db.posts.find(p => p.id === id)
        
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

    deletePost(id: string) {
        let post = db.posts.find(p => p.id === id)

        if (post) {
            db.posts = db.posts.filter(p => p.id !== id)
        } 
    }
}