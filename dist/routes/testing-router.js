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
exports.testsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs/blogs-repository");
const posts_repository_1 = require("../repositories/posts/posts-repository");
const statuses_1 = require("../statuses/statuses");
exports.testsRouter = (0, express_1.Router)({});
exports.testsRouter.delete('/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    blogs_repository_1.blogsRepository.deleteAll();
    posts_repository_1.postsRepository.deleteAll();
    res.sendStatus(statuses_1.HTTP_STATUSES.NO_CONTENT_204);
}));
