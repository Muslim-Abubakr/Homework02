import { BlogType, PostType } from "../models/types"
import { MongoClient } from "mongodb"
import dotenv from 'dotenv'
import { CreatePostBlogModel } from "../models/PostCreateModel"

dotenv.config()

const mongoUri = process.env.mongoURI || process.env.MONGO_URL

if (!mongoUri) {
  throw new Error('! URL not found')
}

export const client = new MongoClient(mongoUri)

console.log(process.env.MONGO_URL)

export const db = client.db('blogPlatform')
export const blogsCollection = db.collection<BlogType>('blogs')    
export const postsCollection = db.collection<PostType | CreatePostBlogModel>('posts')

export async function runDb() {
  try {
    // Connect the client to the server
    await client.connect()
    // Establish and verify connection
    await client.db('blogPlatform').command({ ping: 1 })
    console.log("Connecting succesfully to mongo server")
  } catch(error) {
    console.log(`Can't connect to db`, error)
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}


// export const db: DBType = {
//     posts: [
//         {
//             "id": "1",
//             "title": "post-01",
//             "shortDescription": "string",
//             "content": "string",
//             "blogId": "string",
//             "blogName": "string"
//         },
//         {
//             "id": "2",
//             "title": "post-02",
//             "shortDescription": "string",
//             "content": "string",
//             "blogId": "string",
//             "blogName": "string"
//         }
//     ] ,
    
//     blogs: [
//         {
//             "id": "1",
//             "name": "blog-01",
//             "description": "string",
//             "websiteUrl": "string"
//         },
//         {
//             "id": "2",
//             "name": "blog-02",
//             "description": "string",
//             "websiteUrl": "string"
//         }
//     ]
// }
