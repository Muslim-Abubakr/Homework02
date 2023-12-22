"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_validation_1 = require("../middlewares/posts-validation");
const authorization_1 = require("../middlewares/authorization");
const statuses_1 = require("../statuses/statuses");
const posts_service_1 = require("../domain/posts-service");
const blogs_service_1 = require("../domain/blogs-service");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPosts = yield posts_service_1.postsService.getAllPosts();
    res
        .status(statuses_1.HTTP_STATUSES.OK200)
        .send(foundPosts);
}));
exports.postsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPosts = yield posts_service_1.postsService.getPostsById(req.params.id);
    if (foundPosts) {
        res
            .status(statuses_1.HTTP_STATUSES.OK200)
            .send(foundPosts);
    }
    else {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}));
exports.postsRouter.post('/', authorization_1.authorizationMiddleware, posts_validation_1.validationCreateUpdatePost, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, shortDescription, content, blogId } = req.body;
    const blog = yield blogs_service_1.blogsService.getBlogsById(blogId);
    if (!blog) {
        return res.sendStatus(statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
    }
    const newPost = yield posts_service_1.postsService.createPost(title, shortDescription, content, blogId, blog.name);
    res
        .status(statuses_1.HTTP_STATUSES.CREATED_201)
        .send(newPost);
}));
exports.postsRouter.put('/:id', authorization_1.authorizationMiddleware, posts_validation_1.validationCreateUpdatePost, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, shortDescription, content, blogId } = req.body;
    const blog = yield blogs_service_1.blogsService.getBlogsById(blogId);
    if (!blog) {
        return res.sendStatus(statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
    }
    const isUpdated = yield posts_service_1.postsService.updatePost(req.params.id, title, shortDescription, content, blogId, blog.name);
    if (isUpdated) {
        const post = yield posts_service_1.postsService.getPostsById(blogId);
        res
            .status(statuses_1.HTTP_STATUSES.NO_CONTENT_204)
            .send(post);
    }
    else {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}));
exports.postsRouter.delete('/:id', authorization_1.authorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredPost = yield posts_service_1.postsService.deletePost(req.params.id);
    filteredPost ? res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204) : res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
}));
