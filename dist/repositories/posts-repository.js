"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const database_1 = require("../database");
exports.postsRepository = {
    findPosts(title) {
        if (title) {
            let filteredPosts = database_1.db.blogs.filter(b => b.name.indexOf(title) > -1);
            return filteredPosts;
        }
        else {
            return database_1.db.posts;
        }
    },
    getPostsById(id) {
        let post = database_1.db.posts.find(p => p.id === id);
        return post;
    },
    createPost(id, title, shortDescription, content, blogId, blogName) {
        const newPost = {
            id: String(+(new Date())),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName
        };
        database_1.db.posts.push(newPost);
    },
    updatePost(id, title, shortDescription, content, blogId, blogName) {
        let post = database_1.db.posts.find(p => p.id === id);
        if (post) {
            post.id = id;
            post.title = title;
            post.shortDescription = shortDescription;
            post.content = content;
            post.blogId = blogId;
            post.blogName = blogName;
            return post;
        }
        else {
            return false;
        }
    },
    deletePost(id) {
        let post = database_1.db.posts.find(p => p.id === id);
        if (post) {
            database_1.db.posts = database_1.db.posts.filter(p => p.id !== id);
        }
    }
};
