"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => {
    var _a;
    const foundBlogs = blogs_repository_1.blogsRepository.findBlogs((_a = req.query.name) === null || _a === void 0 ? void 0 : _a.toString());
    res.send(foundBlogs);
});
exports.blogsRouter.get;
