"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const database_1 = require("../database");
exports.postsRepository = {
    findPosts(title) {
        if (title) {
            let filteredPosts = database_1.db.blogs.filter(b => b.name.indexOf(title) > -1);
            return filteredPosts;
        }
        else {
            return database_1.db.posts;
        }
    }
};
