"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testsRouter = void 0;
const express_1 = require("express");
const database_1 = require("../db/database");
exports.testsRouter = (0, express_1.Router)({});
exports.testsRouter.delete('/all-data', (req, res) => {
    database_1.db.blogs = [];
    database_1.db.posts = [];
    res.sendStatus(204);
});
