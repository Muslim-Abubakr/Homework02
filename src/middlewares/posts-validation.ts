import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { inputValidationMiddleware } from "./input-validation-middlewares";
import { db } from "../database";

export const validationCreateUpdatePost = [
   body('title').notEmpty().isString().trim().isLength({min: 1, max: 30}).withMessage('title should not be empty and length min 1 - max 30'),
   body('shortDescription').notEmpty().isString().trim().isLength({min: 1, max: 100}).withMessage('shortDescription should not be empty and length min 1 - max 100'),
   body('content').trim().notEmpty().isString().isLength({min: 1, max: 1000}).withMessage('content should not be empty and length min 1 - max 1000'),
   body('blogId').notEmpty().isString().trim().withMessage('blogId should be a string').custom((value) => {
      let findId = db.blogs.find(p => p.id === value)

      if (!findId) {
         throw new Error('blog not found')
      } else {
         return true 
      }
   }),
   inputValidationMiddleware


   // body('title').isString().trim().isLength({min: 1, max: 30}).withMessage('incorrect title'),
   // body('shortDescription').isString().trim().isLength({min: 1, max: 100}).withMessage('incorrect shortDescription'),
   // body('content').isString().trim().isLength({min: 1, max: 1000}).withMessage('incorrect content'),
   // body('blogId').isString().notEmpty().trim().withMessage('incorrect blogId'),
   // inputValidationMiddleware
]


// .custom((id) => {
//    const foundPost = db.posts.find(b => b.id === id)

//    if (!foundPost) {
//       throw new Error('Blog not found')
//    } else {
//       return true
//    }
// })