const blogQueryRepo = {

    getBlogs(): BlogModelOutType[] {
        return []
    }
}

type s = []

type BlogModelOutType = {
    _id?: any
    id: string | null | undefined
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

type BlogType = {
    id: string | null | undefined
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}