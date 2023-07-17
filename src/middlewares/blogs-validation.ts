import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { inputValidationMiddleware } from "./input-validation-middlewares";

export const validationCreateUpdateBlog = [
    body('name').notEmpty().withMessage('name is required'),
    body('name').isString().trim().isLength({min: 1, max:15}).withMessage('name should not be empty and length min 1 max 15'),
    body('description').notEmpty().withMessage('description is required'),
    body('description').isString().trim().isLength({min: 1, max: 500}).withMessage('description should not be empty and length min 1 max 500'),
    body('websiteUrl').notEmpty().withMessage('websiteUrl is required'),
    body('websiteUrl').isString().trim().isLength({min: 1, max: 100}).withMessage('websiteUrl should not be empty and length min 1 max 100')
    
    // body('name').isString().trim().isLength({min: 1, max: 15}).withMessage('incorrect name'),
    // body('description').isString().trim().isLength({min: 1, max: 500}).withMessage('incorrect description'),
    // body('websiteUrl').isURL().isLength({min: 1, max: 100}).withMessage('incorrect website URL'),
    // inputValidationMiddleware
]