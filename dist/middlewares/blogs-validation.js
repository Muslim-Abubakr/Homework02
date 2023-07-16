"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationCreateUpdateBlog = void 0;
const validation_chain_builders_1 = require("express-validator/src/middlewares/validation-chain-builders");
const input_validation_middlewares_1 = require("./input-validation-middlewares");
exports.validationCreateUpdateBlog = [
    (0, validation_chain_builders_1.body)('name').isString().trim().isLength({ min: 1, max: 15 }).withMessage('incorrect name'),
    (0, validation_chain_builders_1.body)('description').isString().trim().isLength({ min: 1, max: 500 }).withMessage('incorrect description'),
    (0, validation_chain_builders_1.body)('websiteUrl').isURL().isLength({ min: 1, max: 100 }).withMessage('incorrect website URL'),
    input_validation_middlewares_1.inputValidationMiddleware
];
