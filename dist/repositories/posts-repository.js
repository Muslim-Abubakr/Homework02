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
exports.postsRepository = void 0;
const database_1 = require("../db/database");
const uid_1 = require("uid");
exports.postsRepository = {
    findPosts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title) {
                return database_1.postsCollection.find({ name: { $regex: title } }).toArray();
            }
            else {
                return database_1.postsCollection.find({}).toArray();
            }
        });
    },
    getPostsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield database_1.postsCollection.findOne({ id: id });
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
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            yield database_1.postsCollection.insertOne(newPost);
            return newPost;
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
