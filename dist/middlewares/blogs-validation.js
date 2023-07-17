"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationCreateUpdateBlog = void 0;
const validation_chain_builders_1 = require("express-validator/src/middlewares/validation-chain-builders");
exports.validationCreateUpdateBlog = [
    (0, validation_chain_builders_1.body)('name').notEmpty().withMessage('name is required'),
    (0, validation_chain_builders_1.body)('name').trim().isString().isLength({ min: 1, max: 15 }).withMessage('')
    // body('name').isString().trim().isLength({min: 1, max: 15}).withMessage('incorrect name'),
    // body('description').isString().trim().isLength({min: 1, max: 500}).withMessage('incorrect description'),
    // body('websiteUrl').isURL().isLength({min: 1, max: 100}).withMessage('incorrect website URL'),
    // inputValidationMiddleware
];
