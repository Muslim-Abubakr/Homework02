export type PostCreateInputModel = {
    id: number | string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type CreatePostBlogModel = {
    title: string
    shortDescription: string 
    content: string
}