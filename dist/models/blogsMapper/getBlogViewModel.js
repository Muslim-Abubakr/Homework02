"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogViewModel = void 0;
const getBlogViewModel = (blog) => ({
    id: blog.id,
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership
});
exports.getBlogViewModel = getBlogViewModel;
