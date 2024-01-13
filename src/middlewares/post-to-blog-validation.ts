import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { inputValidationMiddleware } from "./input-validation-middlewares";

export const validationCreateUpdatePostToBlog = [
   body('title').notEmpty().isString().trim().isLength({min: 1, max: 30}).withMessage('title should not be empty and length min 1 - max 30'),
   body('shortDescription').notEmpty().isString().trim().isLength({min: 1, max: 100}).withMessage('shortDescription should not be empty and length min 1 - max 100'),
   body('content').trim().notEmpty().isString().isLength({min: 1, max: 1000}).withMessage('content should not be empty and length min 1 - max 1000'),
   inputValidationMiddleware
]
