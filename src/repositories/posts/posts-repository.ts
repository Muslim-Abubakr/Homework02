import { PostDbType, PostModelOutType, SortDataType } from '../../models/types'
import { postsCollection } from '../../db/database'
import { postMapping } from '../../helpers/PostMappingViews'
import { ObjectId } from 'mongodb'

export const postsRepository = {
    async getAllPosts(sortData: SortDataType) {
        const sortDirection: 'asc' | 'desc' = sortData.sortDirection ?? 'desc'
        const sortBy: string = sortData.sortBy ?? 'createdAt'
        const searchNameTerm: string | null = sortData.searchNameTerm ?? null
        const pageSize: number = sortData.pageSize ?? 10
        const pageNumber: number | undefined = sortData.pageNumber ?? 1

        let filter: {} = []

        // переопределяем фильтр, поиск по имени без привязки к регистру
        if (searchNameTerm) {
            filter = {name: {
                $regex: searchNameTerm,
                $options: 'i'
            }}
        }

        const posts = await postsCollection
            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) *  +pageSize)
            .limit(+pageSize)
            .toArray()

        const totalCount = await postsCollection
            .countDocuments(filter)
            
        const pageCount = Math.ceil(totalCount / +pageSize)

        return {
            pagesCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: +totalCount,
            items: posts.map(postMapping)
        }
    },

    async getPostsById(id: string | null | undefined): Promise<PostModelOutType | null> {
        if (!id) {
            return null
        }

        try {
            if (!ObjectId.isValid(id)) {
                return null;
            }
            
            const objectId = new ObjectId(String(id))
            const post: PostDbType | null = await postsCollection.findOne({_id: objectId})
            return post ? postMapping(post) : null
        } catch (error) {
            return null;
        }
    },

    async createPost(newPost: PostModelOutType): Promise<PostModelOutType | void> {
        await postsCollection.insertOne(newPost)
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<boolean | null> {
        try {
            const objectId = new ObjectId(String(id))
            const result = await postsCollection.updateOne({_id: objectId}, {$set: {id: id, title: title, shortDescription: shortDescription, content: content, blogId: blogId, blogName: blogName}})
            return result.matchedCount === 1
        } catch (error) {
            return null;
        }
    },

    async deletePost(id: string): Promise<boolean | null> {
        try {
            const objectId = new ObjectId(String(id))
            const result = await postsCollection.deleteOne({_id: objectId})
            return result.deletedCount === 1
        } catch (error) {

            return null;
        }
        
    },

    async deleteAll(): Promise<boolean> {
        const result = await postsCollection.deleteMany({})
        return result.deletedCount === 1
    }
}

