"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get('/', (req, res) => {
    var _a;
    const foundBlogs = posts_repository_1.postsRepository.findPosts((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    res.send(foundBlogs);
});
