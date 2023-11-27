import { time } from "console"
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
    createdAt: string
}

export type PostModelOutType = {
    _id?: any
    id: number | string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type BlogType = {
    id: string | null | undefined
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type BlogModelOutType = {
    _id?: any
    id: string | null | undefined
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type RequestWithBody<T> = Request<{},{}, T>
export type RequestWithQuery<T> = Request<{},{},{}, T>
export type RequestWithUriParams<T> = Request<T>
export type RequestWithParamsAndBody<T, Y> = Request<T, {}, Y> 