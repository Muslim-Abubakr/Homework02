import express, { Request, Response } from 'express'
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { inputValidationMiddleware } from "./input-validation-middlewares";

export const auth = express.basicAuth(function(user: string, pass: string, next: Function) {

})