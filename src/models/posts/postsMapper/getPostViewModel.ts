import { ViewPostModel } from "../ViewPostModel";
import { PostType } from "../../types";

export const getPostsViewModel = (post: PostType): ViewPostModel => ({
    id: post.id,
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt
})