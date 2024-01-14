import { PostDbType, PostModelOutType, SortDataType } from '../../models/types'
import { postsCollection } from '../../db/database'
import { postMapping } from '../../helpers/PostMappingViews'
import { ObjectId } from 'mongodb'

export const queryPostsRepository = {
    async getAllPosts(sortData: SortDataType) {
        const sortDirection: 'asc' | 'desc' = sortData.sortDirection ?? 'desc'
        const sortBy: string = sortData.sortBy ?? 'createdAt'
        const searchNameTerm: string | null = sortData.searchNameTerm ?? null
        const pageSize: number = sortData.pageSize ?? 10
        const pageNumber: number | undefined = sortData.pageNumber ?? 1

        let filter = {}

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
}