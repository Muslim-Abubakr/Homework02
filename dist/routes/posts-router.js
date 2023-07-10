"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
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
