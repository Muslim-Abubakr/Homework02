export type QueryBlogInputModel = {
    searchNameTerm?: string
    sortBy?: 'asc' | 'desc'
    sortDirection?: 'asc' | 'desc'
    pageNumber?: number
    pageSize?: number
}   

export type QueryPostByBlogIdInputModel = {
    sortBy?: 'asc' | 'desc'
    sortDirection?: 'asc' | 'desc'
    pageNumber?: number
    pageSize?: number
}   