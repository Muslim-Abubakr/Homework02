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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const database_1 = require("../db/database");
const uid_1 = require("uid");
exports.blogsRepository = {
    findBlogs(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (name) {
                filter.name = { $regex: name };
            }
            const blogs = database_1.blogsCollection.find({}, { projection: { _id: 0 } }).toArray();
            return blogs;
        });
    },
    getBlogsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let blog = yield database_1.blogsCollection.findOne({ id: id }, { projection: { _id: 0 } });
            if (blog) {
                return blog;
            }
            else {
                return null;
            }
        });
    },
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: (0, uid_1.uid)(),
                name,
                description,
                websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            yield database_1.blogsCollection.insertOne(newBlog);
            let { _id } = newBlog, newBlogWithout_Id = __rest(newBlog, ["_id"]);
            return newBlogWithout_Id;
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
