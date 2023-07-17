"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationCreateUpdateBlog = void 0;
const validation_chain_builders_1 = require("express-validator/src/middlewares/validation-chain-builders");
const input_validation_middlewares_1 = require("./input-validation-middlewares");
exports.validationCreateUpdateBlog = [
    (0, validation_chain_builders_1.body)('name').notEmpty().withMessage('name is required'),
    (0, validation_chain_builders_1.body)('name').isString().trim().isLength({ min: 1, max: 15 }).withMessage('name should not be empty and length min 1 max 15'),
    (0, validation_chain_builders_1.body)('description').notEmpty().withMessage('description is required'),
    (0, validation_chain_builders_1.body)('description').isString().trim().isLength({ min: 1, max: 500 }).withMessage('description should not be empty and length min 1 max 500'),
    (0, validation_chain_builders_1.body)('websiteUrl').notEmpty().withMessage('websiteUrl is required'),
    (0, validation_chain_builders_1.body)('websiteUrl').isString().trim().isURL().isLength({ min: 1, max: 100 }).withMessage('websiteUrl should not be empty and length min 1 max 100'),
    input_validation_middlewares_1.inputValidationMiddleware
    // body('name').isString().trim().isLength({min: 1, max: 15}).withMessage('incorrect name'),
    // body('description').isString().trim().isLength({min: 1, max: 500}).withMessage('incorrect description'),
    // body('websiteUrl').isURL().isLength({min: 1, max: 100}).withMessage('incorrect website URL'),
];
