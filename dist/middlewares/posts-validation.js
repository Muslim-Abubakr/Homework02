"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationCreateUpdatePost = void 0;
const validation_chain_builders_1 = require("express-validator/src/middlewares/validation-chain-builders");
const input_validation_middlewares_1 = require("./input-validation-middlewares");
exports.validationCreateUpdatePost = [
    (0, validation_chain_builders_1.body)('title').isString().trim().isLength({ min: 1, max: 30 }).withMessage('incorrect title'),
    (0, validation_chain_builders_1.body)('shortDescription').isString().trim().isLength({ min: 1, max: 100 }).withMessage('incorrect shortDescription'),
    (0, validation_chain_builders_1.body)('content').isString().trim().isLength({ min: 1, max: 1000 }).withMessage('incorrect content'),
    (0, validation_chain_builders_1.body)('blogId').isString().notEmpty().trim().withMessage('incorrect blogId'),
    input_validation_middlewares_1.inputValidationMiddleware
];
// .custom((id) => {
//    const foundPost = db.posts.find(b => b.id === id)
//    if (!foundPost) {
//       throw new Error('Blog not found')
//    } else {
//       return true
//    }
// })
