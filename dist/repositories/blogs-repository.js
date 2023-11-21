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
    findBlogs(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (name) {
                filter.name = { $regex: name };
            }
            return database_1.blogsCollection.find({}).toArray();
        });
    },
    getBlogsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogs = yield database_1.blogsCollection.findOne({ id: id });
            if (blogs) {
                return blogs;
            }
            else {
                return null;
            }
        });
    },
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: (+(new Date())).toString(),
                name,
                description,
                websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            database_1.blogsCollection.insertOne(newBlog);
            return newBlog;
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateBlog = yield database_1.blogsCollection.updateOne({ id: id }, { $set: { name: name, description: description, websiteUrl: websiteUrl } });
            return updateBlog.matchedCount === 1;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteBlog = yield database_1.blogsCollection.deleteOne({ id: id });
            return deleteBlog.deletedCount === 1;
        });
    },
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.blogsCollection.deleteMany({});
            return result.deletedCount === 1;
        });
    }
};
