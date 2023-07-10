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
});
