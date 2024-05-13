import { Request } from "express"
import { ObjectId } from "mongodb"

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

export type PostDbType = {
    _id: ObjectId
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

export type BlogDbType = {
    _id: ObjectId
    id: string | null | undefined
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type BlogParams = {
    id: string
}

export type SortDataType = {
    searchNameTerm?: string
    sortBy?: 'asc' | 'desc'
    sortDirection?: 'asc' | 'desc'
    pageNumber?: number
    pageSize?: number
}   

export type SortUsersDataType = {
    sortBy?: 'asc' | 'desc'
    sortDirection?: 'asc' | 'desc'
    pageNumber?: number
    pageSize?: number
    searchLoginTerm?: string | undefined
    searchEmailTerm?: string | undefined
}

export type ParamsType = {
    id: string
}

export type BlogOutputType = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: {
        id: string;
        name: string;
        description: string;
        websiteUrl: string;
        createdAt: string;
        isMembership: boolean;
    }[];
}


export type RequestWithBody<T> = Request<{},{}, T>
export type RequestWithQuery<T> = Request<{},{},{}, T>
export type RequestWithUriParams<T> = Request<T>
export type RequestWithParamsAndBody<T, Y> = Request<T, {}, Y> 
export type RequestWithParamsAndQuery<P, Q> = Request<P, {}, {}, Q>