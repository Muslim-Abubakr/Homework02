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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
const testing_router_1 = require("./routes/testing-router");
const database_1 = require("./db/database");
const app = (0, express_1.default)();
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const port = process.env.PORT || 3000;
const RouterPaths = {
    testing: '/testing',
    blogs: '/blogs',
    posts: '/posts'
};
app.get('/', (req, res) => {
    res.send('Welcome to the main page');
});
app.use(RouterPaths.testing, testing_router_1.testsRouter);
app.use(RouterPaths.blogs, blogs_router_1.blogsRouter);
app.use(RouterPaths.posts, posts_router_1.postsRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.runDb)();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
