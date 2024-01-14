import { blogsCollection, postsCollection } from '../../db/database'
import { blogMapping } from '../../helpers/BlogMappingViews'
import { postMapping } from '../../helpers/PostMappingViews'
import { QueryPostByBlogIdInputModel } from '../../models/blogs/input/query.blog.input.model'
import { BlogDbType, SortDataType } from '../../models/types'
import { BlogModelOutType } from '../../models/types'
import { ObjectId } from 'mongodb'

export const queryBlogsRepository = {
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

            const pagesCount = Math.ceil(totalCount / +pageSize)

            return {
                pagesCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: +totalCount,
                items: posts.map(postMapping)
            }
    },
}