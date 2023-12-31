import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { inputValidationMiddleware } from "./input-validation-middlewares";

export const validationCreateUpdateBlog = [
    body('name').notEmpty().isString().trim().isLength({min: 1, max:15}).withMessage('name should not be empty and length min 1 max 15'),
    body('description').notEmpty().isString().trim().isLength({min: 1, max: 500}).withMessage('description should not be empty and length min 1 max 500'),
    body('websiteUrl').notEmpty().isString().trim().isURL().isLength({min: 1, max: 100}).withMessage('websiteUrl should not be empty and length min 1 max 100'),
    inputValidationMiddleware
]