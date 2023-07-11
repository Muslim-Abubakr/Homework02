"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
const blogs_validation_1 = require("../middlewares/blogs-validation");
const authorization_1 = require("../middlewares/authorization");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => {
    const foundBlogs = blogs_repository_1.blogsRepository.findBlogs();
    res.send(foundBlogs);
});
exports.blogsRouter.get('/:id', (req, res) => {
    const foundBlogs = blogs_repository_1.blogsRepository.getBlogsById(req.params.id);
    if (foundBlogs) {
        res
            .status(200)
            .send(foundBlogs);
    }
    else {
        res.send(404);
    }
});
exports.blogsRouter.post('/', authorization_1.authorizationMiddleware, blogs_validation_1.validationCreateUpdateBlog, (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const newBlog = blogs_repository_1.blogsRepository.createBlog(name, description, websiteUrl);
    res
        .status(201)
        .send(newBlog);
});
exports.blogsRouter.put('/:id', authorization_1.authorizationMiddleware, blogs_validation_1.validationCreateUpdateBlog, (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const isUpdated = blogs_repository_1.blogsRepository.updateBlog(req.params.id, name, description, websiteUrl);
    if (isUpdated) {
        const blog = blogs_repository_1.blogsRepository.getBlogsById(req.params.id);
        res.send(blog);
    }
    else {
        res.send(404);
    }
});
exports.blogsRouter.delete('/:id', authorization_1.authorizationMiddleware, (req, res) => {
    const filteredBlog = blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
    filteredBlog ? res.sendStatus(204) : res.sendStatus(404);
});
