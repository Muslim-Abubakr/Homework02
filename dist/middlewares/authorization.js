"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const authorizationMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    console.log(req.body, "body");
    if (!auth) {
        return res.sendStatus(401);
    }
    else if (auth !== 'Basic YWRtaW46cXdlcnR5') {
        return res.sendStatus(401);
    }
    else {
        return next();
    }
};
exports.authorizationMiddleware = authorizationMiddleware;
