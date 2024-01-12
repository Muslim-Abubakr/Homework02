import { blogsCollection, postsCollection } from '../../db/database'
import { blogMapping } from '../../helpers/BlogMappingViews'
import { postMapping } from '../../helpers/PostMappingViews'
import { QueryPostByBlogIdInputModel } from '../../models/blogs/input/query.blog.input.model'
import { CreatePostBlogModel } from '../../models/posts/PostCreateModel'
import { BlogDbType, PostType, SortDataType } from '../../models/types'
import { BlogModelOutType } from '../../models/types'
import { ObjectId } from 'mongodb'

export const blogsRepository = {
    async getAllBlogs(sortData: SortDataType) {
        const sortDirection: 'asc' | 'desc' = sortData.sortDirection ?? 'desc'
        const sortBy: string = sortData.sortBy ?? 'createdAt'
        const searchNameTerm: string | null = sortData.searchNameTerm ?? null
        const pageSize: number = sortData.pageSize ?? 10
        const pageNumber: number | undefined = sortData.pageNumber ?? 1

        let filter: {} = {}

        // переопределяем фильтр, поиск по имени без привязки к регистру
        if (searchNameTerm) {
            filter = {name: {
                $regex: searchNameTerm,
                $options: 'i'
            }}
        }

        const blogs = await blogsCollection
            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) *  +pageSize)
            .limit(+pageSize)
            .toArray()

        const totalCount = await blogsCollection
            .countDocuments(filter)
            
        const pageCount = Math.ceil(totalCount / +pageSize)

        return {
            searchNameTerm: searchNameTerm,
            pagesCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: +totalCount,
            items: blogs.map(blogMapping)
        }
    },

    async getBlogsById(id: string | null | undefined): Promise<BlogModelOutType | null> {
        if (!id) {
            return null
        }
        
        try {
            if (!ObjectId.isValid(id)) {
                return null;
            }
            
            const objectId = new ObjectId(String(id)) 
            const blog: BlogDbType | null = await blogsCollection.findOne({_id: objectId})
            return blog ? blogMapping(blog) : null;
        } catch (error) {
            return null;
        }

    },

    async getPostsByBlogId(blogId: string, sortData: QueryPostByBlogIdInputModel): Promise<any> {
        const sortDirection: 'asc' | 'desc' = sortData.sortDirection ?? 'desc'
        const sortBy: string = sortData.sortBy ?? 'createdAt'
        const pageSize: number = sortData.pageSize ?? 10
        const pageNumber: number | undefined = sortData.pageNumber ?? 1

        const posts = await postsCollection
            .find({blogId: blogId})
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) *  +pageSize)
            .limit(+pageSize)
            .toArray()
 
            const totalCount = await postsCollection
            .countDocuments({blogId: blogId})

            const pageCount = Math.ceil(totalCount / +pageSize)

            return {
                pageCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: +totalCount,
                items: posts.map(postMapping)
            }
    },

    async createBlog(newBlog: BlogModelOutType): Promise<BlogModelOutType | void> {
        await blogsCollection.insertOne(newBlog)
    },

    async createPostToBlog(blogId: string, postData: CreatePostBlogModel): Promise <any> {
        const blog = await this.getBlogsById(blogId)

        const post: PostType = {
            id: postData.id,
            title: postData.title,
            shortDescription: postData.shortDescription,
            content: postData.content,
            blogId: blogId,
            blogName: blog!.name,
            createdAt: postData.createdAt
        }

        const res = await postsCollection.insertOne(post)

        return res.insertedId
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean | null> {

        try {
            if (!ObjectId.isValid(id)) {
                return null;
            }

            const objectId = new ObjectId(String(id)) 
            const updateBlog = await blogsCollection.updateOne({_id: objectId}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})
            return updateBlog.matchedCount === 1
        } catch (error) {
            return null;
        }
    },

    async deleteBlog(id: string): Promise<boolean | null> {
        try {
            const objectId = new ObjectId(String(id)) 
            const deleteBlog = await blogsCollection.deleteOne({_id: objectId})
            return deleteBlog.deletedCount === 1
        } catch (error) {
            return null;
        }
    },

    async deleteAll(): Promise<boolean> {
        const result = await blogsCollection.deleteMany({})
        return result.deletedCount === 1
    }
}

