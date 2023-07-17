import { NextFunction, Request, Response } from "express"
import { validationResult, FieldValidationError } from "express-validator"

// const errorForm = ({ msg, path }: any) => {
//     return {
//         message: msg,
//         field: path
//     }
// }

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {    
        const errorsMessages = errors.array({ onlyFirstError: true }).map(error => ({
            message: error.msg,
            field: (error as FieldValidationError).path
        }))

        return res.status(400).send({errorsMessages})
    } else {
        next()
    }
}