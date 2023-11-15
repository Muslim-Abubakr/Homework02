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
exports.postsRepository = {
    findPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.db.posts;
        });
    },
    getPostsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = database_1.db.posts.find(p => p.id === id);
            return post;
        });
    },
    createPost(title, shortDescription, content, blogId, blogName) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = {
                id: String(+(new Date())),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blogName
            };
            database_1.db.posts.push(newPost);
            return newPost;
        });
    },
    updatePost(id, title, shortDescription, content, blogId, blogName) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = database_1.db.posts.find(p => p.id === id);
            if (post) {
                post.id = id;
                post.title = title;
                post.shortDescription = shortDescription;
                post.content = content;
                post.blogId = blogId;
                post.blogName = blogName;
                return true;
            }
            else {
                return false;
            }
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = database_1.db.posts.find(p => p.id === id);
            if (post) {
                database_1.db.posts = database_1.db.posts.filter(p => p.id !== id);
                return true;
            }
            else {
                return false;
            }
        });
    }
};
