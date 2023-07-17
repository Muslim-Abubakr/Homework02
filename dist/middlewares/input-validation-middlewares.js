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
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsMessages = errors.array({ onlyFirstError: false }).map(error => ({
            message: error.msg,
            field: error.path
        }));
        return res.status(400).send({ errorsMessages });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
