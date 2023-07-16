"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const errorForm = ({ msg, path }) => {
    return {
        message: msg,
        field: path
    };
};
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsMessages = errors.array({ onlyFirstError: true }).map(e => errorForm(e));
        res
            .status(400)
            .json({ errorsMessages });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
