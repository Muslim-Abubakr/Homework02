import { SortUsersDataType } from '../../models/types'
import { usersCollection } from '../../db/database'
import { userMapping } from '../../helpers/UserMappingViews'

export const queryUsersRepository = {
    async getAllUsers   (sortData: SortUsersDataType) {
        const sortDirection: 'asc' | 'desc' = sortData.sortDirection ?? 'desc'
        const sortBy: string = sortData.sortBy ?? 'createdAt'
        const searchLoginTerm: string | null = sortData.searchLoginTerm ?? null
        const searchEmailTerm: string | null = sortData.searchEmailTerm ?? null
        const pageSize: number = sortData.pageSize ?? 10
        const pageNumber: number | undefined = sortData.pageNumber ?? 1

        let filter = {}

        // переопределяем фильтр, поиск по имени без привязки к регистру
        if (searchLoginTerm) {
            filter = {login: {
                $regex: searchLoginTerm,
                $options: 'i'
            }}
        }

        if (searchEmailTerm) {
            filter = {email: {
                $regex: searchEmailTerm,
                $options: 'i'
            }}
        }

        const users = await usersCollection
            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) *  +pageSize)
            .limit(+pageSize)
            .toArray()

        const totalCount = await usersCollection
            .countDocuments(filter)
            
        const pageCount = Math.ceil(totalCount / +pageSize)

        return {
            pagesCount: pageCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: +totalCount,
            items: users.map(userMapping)
        }
    }
}