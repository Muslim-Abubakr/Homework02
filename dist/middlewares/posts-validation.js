"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationCreateUpdatePost = void 0;
const validation_chain_builders_1 = require("express-validator/src/middlewares/validation-chain-builders");
const input_validation_middlewares_1 = require("./input-validation-middlewares");
exports.validationCreateUpdatePost = [
    (0, validation_chain_builders_1.body)('title').notEmpty().isString().trim().isLength({ min: 1, max: 30 }).withMessage('title should not be empty and length min 1 - max 30'),
    (0, validation_chain_builders_1.body)('shortDescription').notEmpty().isString().trim().isLength({ min: 1, max: 100 }).withMessage('shortDescription should not be empty and length min 1 - max 100'),
    (0, validation_chain_builders_1.body)('content').trim().notEmpty().isString().isLength({ min: 1, max: 1000 }).withMessage('content should not be empty and length min 1 - max 1000'),
    //body('blogId').notEmpty().isString().trim().withMessage('blogId should be a string').custom(id => {
    // const foundBlog = blogsRepository.getBlogsById(id)
    // if (!foundBlog) {
    //    throw new Error('blog for specific post not found')
    // } else {
    //    return true 
    // }
    //}),
    input_validation_middlewares_1.inputValidationMiddleware
];
