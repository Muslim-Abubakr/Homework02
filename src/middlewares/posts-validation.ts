import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { inputValidationMiddleware } from "./input-validation-middlewares";
import { db } from "../database";

export const validationCreateUpdatePost = [
   body('title').isString().trim().isLength({min: 1, max: 30}).withMessage('incorrect title'),
   body('shortDescription').isString().trim().isLength({min: 1, max: 100}).withMessage('incorrect shortDescription'),
   body('content').isString().trim().isLength({min: 1, max: 1000}).withMessage('incorrect content'),
   body('blogId').isString().trim().notEmpty().withMessage('incorrect shortDescription'),
   inputValidationMiddleware
]
