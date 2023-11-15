"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const database_1 = require("../db/database");
exports.blogsRepository = {
    findBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.db.blogs;
        });
    },
    getBlogsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let blog = database_1.db.blogs.find(b => b.id === id);
            return blog;
        });
    },
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: (+(new Date())).toString(),
                name,
                description,
                websiteUrl
            };
            database_1.db.blogs.push(newBlog);
            return newBlog;
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let blog = database_1.db.blogs.find(b => b.id === id);
            if (blog) {
                database_1.db.blogs = database_1.db.blogs.filter(b => b.id !== id);
                return true;
            }
            else {
                return false;
            }
        });
    }
};
