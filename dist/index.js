"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
const database_1 = require("./database");
var database_2 = require("./database");
Object.defineProperty(exports, "HTTP_STATUSES", { enumerable: true, get: function () { return database_2.HTTP_STATUSES; } });
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
app.get('/', (req, res) => {
    res.send('Welcome to the main page');
});
app.delete('/testing/all-data', (req, res) => {
    database_1.db.posts = [];
    database_1.db.blogs = [];
    res.sendStatus(204);
});
app.use('/blogs', blogs_router_1.blogsRouter);
app.use('/posts', posts_router_1.postsRouter);
app.listen(port, () => {
    console.log(`Example app listening onn port ${port}`);
});
