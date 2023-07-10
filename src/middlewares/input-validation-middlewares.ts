import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"

const errorForm = ({ msg, path }: any) => {
    return {
        message: msg,
        field: path
    }
}

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {    
        const errorsMsg = errors.array({ onlyFirstError: true }).map(e => errorForm(e))
        res 
            .status(400)
            .json(errorsMsg)
    } else {
        next()
    }
}