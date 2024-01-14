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
exports.validationCreateUpdatePost = void 0;
const validation_chain_builders_1 = require("express-validator/src/middlewares/validation-chain-builders");
const input_validation_middlewares_1 = require("./input-validation-middlewares");
const queryBlogs_repository_1 = require("../repositories/blogs/queryBlogs-repository");
exports.validationCreateUpdatePost = [
    (0, validation_chain_builders_1.body)('title').notEmpty().isString().trim().isLength({ min: 1, max: 30 }).withMessage('title should not be empty and length min 1 - max 30'),
    (0, validation_chain_builders_1.body)('shortDescription').notEmpty().isString().trim().isLength({ min: 1, max: 100 }).withMessage('shortDescription should not be empty and length min 1 - max 100'),
    (0, validation_chain_builders_1.body)('content').trim().notEmpty().isString().isLength({ min: 1, max: 1000 }).withMessage('content should not be empty and length min 1 - max 1000'),
    (0, validation_chain_builders_1.body)('blogId').notEmpty().isString().trim().withMessage('blogId should be a string').custom((id) => __awaiter(void 0, void 0, void 0, function* () {
        const foundBlogById = yield queryBlogs_repository_1.queryBlogsRepository.getBlogsById(id);
        if (!foundBlogById) {
            throw new Error('blog for specific post not found');
        }
        else {
            return true;
        }
    })),
    input_validation_middlewares_1.inputValidationMiddleware
];
