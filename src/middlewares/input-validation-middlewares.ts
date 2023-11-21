import { log } from "console"
import { NextFunction, Request, Response } from "express"
import { validationResult, FieldValidationError } from "express-validator"

// const errorForm = ({ msg, path }: any) => {
//     return {
//         message: msg,
//         field: path
//     }
// }

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Im in inputValidationMiddleware")
    const errors = validationResult(req)
    console.log(errors, " errors")
    if (!errors.isEmpty()) {    
        const errorsMessages = errors.array({ onlyFirstError: true }).map(error => ({
            message: error.msg,
            field: (error as FieldValidationError).path
        }))
        console.log("not Ok")
        console.log("errorsMessages", errorsMessages)
        return res.status(400).send({errorsMessages})
    } else {
        console.log("Ok")
        next()
    }
}