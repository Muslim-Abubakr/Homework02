import { Request } from "express"

export type DBType = {
    posts: PostType[]
    blogs: BlogType[]
}

export type PostType = {
    id: number | string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

export type BlogType = {
    id: string | null | undefined
    name: string
    description: string
    websiteUrl: string
}

export type RequestWithBody<T> = Request<{},{}, T>
export type RequestWithQuery<T> = Request<{},{},{}, T>
export type RequestWithUriParams<T> = Request<T>
export type RequestWithParamsAndBody<T, Y> = Request<T, {}, Y> 