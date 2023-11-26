"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsViewModel = void 0;
const getPostsViewModel = (post) => ({
    id: post.id,
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt
});
exports.getPostsViewModel = getPostsViewModel;
