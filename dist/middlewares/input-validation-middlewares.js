"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
// const errorForm = ({ msg, path }: any) => {
//     return {
//         message: msg,
//         field: path
//     }
// }
const inputValidationMiddleware = (req, res, next) => {
    console.log("Im in inputValidationMiddleware");
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(errors, " errors");
    if (!errors.isEmpty()) {
        const errorsMessages = errors.array({ onlyFirstError: true }).map(error => ({
            message: error.msg,
            field: error.path
        }));
        console.log("not Ok");
        console.log("errorsMessages", errorsMessages);
        return res.status(400).send({ errorsMessages });
    }
    else {
        console.log("Ok");
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
