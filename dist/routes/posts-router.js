"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const posts_validation_1 = require("../middlewares/posts-validation");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get('/', (req, res) => {
    const foundPosts = posts_repository_1.postsRepository.findPosts();
    res.send(foundPosts);
});
exports.postsRouter.get('/:id', (req, res) => {
    const foundPosts = posts_repository_1.postsRepository.getPostsById(req.params.id);
    if (foundPosts) {
        res
            .status(200)
            .send(foundPosts);
    }
    else {
        res.sendStatus(404);
    }
});
exports.postsRouter.post('/', posts_validation_1.validationCreateUpdatePost, (req, res) => {
    const { title, shortDescription, content, blogId, blogName } = req.body;
    const newPost = posts_repository_1.postsRepository.createPost(title, shortDescription, content, blogId, blogName);
    res
        .status(201)
        .send(newPost);
});
exports.postsRouter.put('/:id', posts_validation_1.validationCreateUpdatePost, (req, res) => {
    const { title, shortDescription, content, blogId, blogName } = req.body;
    const isUpdated = posts_repository_1.postsRepository.updatePost(req.params.id, title, shortDescription, content, blogId, blogName);
    if (isUpdated) {
        const post = posts_repository_1.postsRepository.getPostsById(req.params.id);
        res.send(post);
    }
    else {
        res.status(404);
    }
});
exports.postsRouter.delete('/:id', (req, res) => {
    const filteredPost = posts_repository_1.postsRepository.deletePost(req.params.id);
    filteredPost ? res.sendStatus(204) : res.sendStatus(404);
});
