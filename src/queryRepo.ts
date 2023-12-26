/* import { db } from "./db/database"

const videoQueryRepo = {
    getVideos(): VideoOutputModel[] {
        const dbVideos: DBVideoModel[] = [] 
        const authors: DBAuthorModel[] = []

        return dbVideos.map(dbVideo => {
            const author = authors.find(a => a._id === dbVideo.authorId)
            return this._mapVideoToVideoOutputModel(dbVideo, author!)
        }) 
    },

    getVideoById(id: string): VideoOutputModel {
        const dbVideo: DBVideoModel = {
            _id: '2232',
            title: 'title',
            authorId: '2233'
        }
        const author: DBAuthorModel = {
            _id: '2222',
             firstName: 'Muslim',
            lastName: 'Abubakr'
        }

        return this._mapVideoToVideoOutputModel(dbVideo, author)
        },

        _mapVideoToVideoOutputModel(dbVideo: DBVideoModel, author: DBAuthorModel) {
            return {
                id: dbVideo._id,
                title: dbVideo.title,
                author: {
                    id: author!._id,
                    name: author!.firstName + ' ' + author!.lastName
                },
            }
        },

        getBannedVideoById(id: string): BannedVideoOutputModel {
            const dbVideos: DBVideoModel[] = [] 
            const authors: DBAuthorModel[] = []

            return dbVideos.map(dbVideo => {
                const author = authors.find(a => a._id === dbVideo.authorId)
                return {
                    id: dbVideo._id,
                    title: dbVideo.title,
                    author: {
                        id: author!._id,
                        name: author!.firstName + ' ' + author!.lastName
                    },
                    banReason: dbVideo.banObject!.banReason
                }
            }) 
        }

    }


type VideoOutputModel = {
    id: string
    title: string
    author: {
        id: string
        name: string
    }
}

type DBVideoModel = {
    _id: string
    title: string
    authorId: string
    banObject: null | {
        isBanned: boolean
        banReason: string
    }

}

type DBAuthorModel = {
    _id: string
    firstName: string
    lastName: string
}

type BannedVideoOutputModel = {
    id: string
    title: string
    author: {
        id: string
        name: string
    }
    banReason: string
}

*/