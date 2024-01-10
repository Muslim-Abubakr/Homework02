import { ViewBlogModel } from "../blogs/ViewBlogModel";
import { BlogType } from "../types";

export const getBlogViewModel = (blog: BlogType): ViewBlogModel => ({
    id: blog.id,
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership
})