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
exports.postsRepository = void 0;
const database_1 = require("../db/database");
const uid_1 = require("uid");
exports.postsRepository = {
    findPosts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (title) {
                filter.title = { $regex: title };
            }
            const posts = database_1.postsCollection.find({}, { projection: { _id: 0 } }).toArray();
            return posts;
        });
    },
    getPostsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield database_1.postsCollection.findOne({ id: id }, { projection: { _id: 0 } });
            if (post) {
                return post;
            }
            else {
                return null;
            }
        });
    },
    createPost(title, shortDescription, content, blogId, blogName) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                id: (0, uid_1.uid)(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blogName,
                createdAt: new Date().toISOString()
            };
            yield database_1.postsCollection.insertOne(newPost);
            let { _id } = newPost, newPostWithoud_id = __rest(newPost, ["_id"]);
            return newPostWithoud_id;
        });
    },
    updatePost(id, title, shortDescription, content, blogId, blogName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.postsCollection.updateOne({ id: id }, { $set: { id: id, title: title, shortDescription: shortDescription, content: content, blogId: blogId, blogName: blogName } });
            return result.matchedCount === 1;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.postsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.postsCollection.deleteMany({});
            return result.deletedCount === 1;
        });
    }
};
