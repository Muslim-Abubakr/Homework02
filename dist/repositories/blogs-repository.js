"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const database_1 = require("../database");
exports.blogsRepository = {
    findBlogs(name) {
        if (name) {
            let filteredBlogs = database_1.db.blogs.filter(b => b.name.indexOf(name) > -1);
            return filteredBlogs;
        }
        else {
            return database_1.db.blogs;
        }
    },
    getBlogsById(id) {
        let blog = database_1.db.blogs.find(b => b.id === id);
        return blog;
    },
    createBlog(id, name, description, websiteUrl) {
        const newBlog = {
            id: String(+(new Date())),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        };
        database_1.db.blogs.push(newBlog);
    },
    updateBlog(id, name, description, websiteUrl) {
        let blog = database_1.db.blogs.find(b => b.id === id);
        if (blog) {
            database_1.db.blogs.id = id;
        }
    }
};
