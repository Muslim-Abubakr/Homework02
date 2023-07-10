"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
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
exports.blogsRouter.post('/', (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const newBlog = blogs_repository_1.blogsRepository.createBlog(name, description, websiteUrl);
    res
        .status(201)
        .send(newBlog);
});
exports.blogsRouter.put('/:id', (req, res) => {
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
exports.blogsRouter.delete('/:id', (req, res) => {
    const filteredBlog = blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
    filteredBlog ? res.sendStatus(204) : res.sendStatus(404);
});
