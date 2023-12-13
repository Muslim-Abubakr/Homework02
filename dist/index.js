"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
const testing_router_1 = require("./routes/testing-router");
exports.app = (0, express_1.default)();
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
const RouterPaths = {
    testing: '/testing',
    blogs: '/blogs',
    posts: '/posts'
};
exports.app.get('/', (req, res) => {
    res.send('Welcome to the main page');
});
exports.app.use(RouterPaths.testing, testing_router_1.testsRouter);
exports.app.use(RouterPaths.blogs, blogs_router_1.blogsRouter);
exports.app.use(RouterPaths.posts, posts_router_1.postsRouter);
