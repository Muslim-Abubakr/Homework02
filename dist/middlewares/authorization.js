"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const authorizationMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.sendStatus(401);
    }
    else if (auth !== 'YWRtaW46cXdlcnR5') {
        return res.sendStatus(401);
    }
    else {
        next();
    }
};
exports.authorizationMiddleware = authorizationMiddleware;
