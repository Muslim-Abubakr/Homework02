"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const database_1 = require("../db/database");
exports.blogsRepository = {
    findBlogs() {
        return database_1.db.blogs;
    },
    getBlogsById(id) {
        let blog = database_1.db.blogs.find(b => b.id === id);
        return blog;
    },
    createBlog(name, description, websiteUrl) {
        const newBlog = {
            id: (+(new Date())).toString(),
            name,
            description,
            websiteUrl
        };
        database_1.db.blogs.push(newBlog);
        return newBlog;
    },
    updateBlog(id, name, description, websiteUrl) {
        const blog = database_1.db.blogs.find(b => b.id === id);
        if (blog) {
            blog.name = name;
            blog.description = description;
            blog.websiteUrl = websiteUrl;
            return true;
        }
        else {
            return false;
        }
    },
    deleteBlog(id) {
        let blog = database_1.db.blogs.find(b => b.id === id);
        if (blog) {
            database_1.db.blogs = database_1.db.blogs.filter(b => b.id !== id);
            return true;
        }
        else {
            return false;
        }
    }
};
