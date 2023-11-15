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
const blogs_repository_1 = require("../repositories/blogs-repository");
const blogs_validation_1 = require("../middlewares/blogs-validation");
const authorization_1 = require("../middlewares/authorization");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlogs = yield blogs_repository_1.blogsRepository.findBlogs();
    res.send(foundBlogs);
}));
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlogs = yield blogs_repository_1.blogsRepository.getBlogsById(req.params.id);
    if (foundBlogs) {
        res
            .status(200)
            .send(foundBlogs);
    }
    else {
        res.status(404);
    }
}));
exports.blogsRouter.post('/', authorization_1.authorizationMiddleware, blogs_validation_1.validationCreateUpdateBlog, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    const newBlog = yield blogs_repository_1.blogsRepository.createBlog(name, description, websiteUrl);
    res
        .status(201)
        .send(newBlog);
}));
exports.blogsRouter.put('/:id', authorization_1.authorizationMiddleware, blogs_validation_1.validationCreateUpdateBlog, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    const isUpdated = yield blogs_repository_1.blogsRepository.updateBlog(req.params.id, name, description, websiteUrl);
    if (isUpdated) {
        const blog = yield blogs_repository_1.blogsRepository.getBlogsById(req.params.id);
        res
            .status(204)
            .send(blog);
    }
    else {
        res.status(404);
    }
}));
exports.blogsRouter.delete('/:id', authorization_1.authorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredBlog = yield blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
    filteredBlog ? res.sendStatus(204) : res.sendStatus(404);
}));
