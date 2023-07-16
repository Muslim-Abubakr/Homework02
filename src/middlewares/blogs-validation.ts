import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { inputValidationMiddleware } from "./input-validation-middlewares";

export const validationCreateUpdateBlog = [
    body('name').isString().trim().isLength({min: 1, max: 500}).withMessage('incorrect name'),
    body('description').isString().trim().isLength({min: 1, max: 500}).withMessage('incorrect description'),
    body('websiteUrl').isURL().isLength({min: 1, max: 100}).withMessage('incorrect website URL'),
    inputValidationMiddleware
]