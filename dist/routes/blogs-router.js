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
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_validation_1 = require("../middlewares/blogs-validation");
const authorization_1 = require("../middlewares/authorization");
const statuses_1 = require("../statuses/statuses");
const blogs_service_1 = require("../domain/blogs-service");
const posts_validation_1 = require("../middlewares/posts-validation");
const blogs_repository_1 = require("../repositories/blogs/blogs-repository");
const posts_repository_1 = require("../repositories/posts/posts-repository");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    };
    const foundBlogs = yield blogs_service_1.blogsService.getAllBlogs(sortData);
    res.send(foundBlogs);
}));
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlogs = yield blogs_service_1.blogsService.getBlogsById(req.params.id);
    if (foundBlogs) {
        res
            .status(statuses_1.HTTP_STATUSES.OK200)
            .send(foundBlogs);
    }
    else {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}));
exports.blogsRouter.post('/', authorization_1.authorizationMiddleware, blogs_validation_1.validationCreateUpdateBlog, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    const newBlog = yield blogs_service_1.blogsService.createBlog(name, description, websiteUrl);
    res
        .status(statuses_1.HTTP_STATUSES.CREATED_201)
        .send(newBlog);
}));
exports.blogsRouter.post('/:id', authorization_1.authorizationMiddleware, posts_validation_1.validationCreateUpdatePost, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, shortDescription, content } = req.body;
    const blog = yield blogs_service_1.blogsService.createBlog(title, shortDescription, content);
}));
exports.blogsRouter.post('/:id/posts', authorization_1.authorizationMiddleware, blogs_validation_1.validationCreateUpdateBlog, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.params.id;
    const blog = yield blogs_repository_1.blogsRepository.getBlogsById(blogId);
    if (!blog) {
        res.sendStatus(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    const createdPostId = yield blogs_repository_1.blogsRepository.createPostToBlog(blogId, { title, shortDescription, content });
    const post = yield posts_repository_1.postsRepository.getPostsById(createdPostId);
}));
exports.blogsRouter.put('/:id', authorization_1.authorizationMiddleware, blogs_validation_1.validationCreateUpdateBlog, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    const isUpdated = yield blogs_service_1.blogsService.updateBlog(req.params.id, name, description, websiteUrl);
    if (isUpdated) {
        const blog = yield blogs_service_1.blogsService.getBlogsById(req.params.id);
        res
            .status(statuses_1.HTTP_STATUSES.NO_CONTENT_204)
            .send(blog);
    }
    else {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}));
exports.blogsRouter.delete('/:id', authorization_1.authorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredBlog = yield blogs_service_1.blogsService.deleteBlog(req.params.id);
    if (filteredBlog) {
        res.send(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.send(statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
}));
