import { DBType, PostType } from "../models/types"
import { BlogType } from "../models/types"

export const db: DBType = {
    posts: [
        {
            "id": "1",
            "title": "post-01",
            "shortDescription": "string",
            "content": "string",
            "blogId": "string",
            "blogName": "string"
        },
        {
            "id": "2",
            "title": "post-02",
            "shortDescription": "string",
            "content": "string",
            "blogId": "string",
            "blogName": "string"
        }
    ] ,
    
    blogs: [
        {
            "id": "1",
            "name": "blog-01",
            "description": "string",
            "websiteUrl": "string"
        },
        {
            "id": "2",
            "name": "blog-02",
            "description": "string",
            "websiteUrl": "string"
        }
    ]
}

export const HTTP_STATUSES = {
    OK200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
  
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,

    UNAUTHORIZED_401: 401
  }