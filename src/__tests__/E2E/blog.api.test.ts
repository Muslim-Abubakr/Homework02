import request from 'supertest'
import { app } from '../../app'
import { HTTP_STATUSES } from '../../statuses/statuses'

const token = 'Basic YWRtaW46cXdlcnR5' 

describe('/blogs', () => {
    beforeAll(async ()=> {
        await request(app).delete('/testing/all-data')
    })
    
    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/blogs')
            .expect(HTTP_STATUSES.OK200, [])
    }) 

    it('should return 404 for not existing blog', async () => {
        await request(app)
            .get('/blogs/111')
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('shouldn`t create blog with incorrect input data', async() => {
        const incorrectBlogData = {
            name: 'Muslim',
            description: '',
            websiteUrl: 'https://www.webSite.ru'
        }
       await request(app)
            .post('/blogs')
            .set('Authorization', token)
            .send(incorrectBlogData)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
    })

    let createdBlog1: any = null
    it('should create blog with correct input data', async () => {
        const blogData = {
            name: 'Muslim',
            description: 'test-blog',
            websiteUrl: 'https://www.webSite.ru'
        }

        const createResponse = await request(app)
            .post('/blogs')
            .set('Authorization', token)
            .send(blogData)
            .expect(HTTP_STATUSES.CREATED_201)

        createdBlog1 = createResponse.body

        expect(createdBlog1).toEqual({
                id: expect.any(String),
                name: 'Muslim',
                description: 'test-blog',
                websiteUrl: 'https://www.webSite.ru',
                createdAt: expect.any(String),
                isMembership: expect.any(Boolean)
        })

        await request(app)
            .get('/blogs')
            .expect(HTTP_STATUSES.OK200, [createdBlog1])
    })

    let createdBlog2: any = null
    it('should one more blog', async() => {
        const blogData = {
            name: 'Muslim',
            description: 'test-blog2',
            websiteUrl: 'https://www.webSite.ru'
        }

        const createResponse = await request(app)
            .post('/blogs')
            .set('Authorization', token)
            .send(blogData)
            .expect(HTTP_STATUSES.CREATED_201)

        createdBlog2 = createResponse.body

        expect(createdBlog2).toEqual({
                id: expect.any(String),
                name: 'Muslim',
                description: 'test-blog2',
                websiteUrl: 'https://www.webSite.ru',
                createdAt: expect.any(String),
                isMembership: expect.any(Boolean)
        })

        await request(app)
            .get('/blogs')
            .expect(HTTP_STATUSES.OK200, [createdBlog1, createdBlog2])
    })

    it('shouldn`t update blog with incorrect input data', async() => {
        const blogData = {
            name: '',
            description: 'test-blog',
            websiteUrl: 'https://www.webSite.ru'
        }

        await request(app)
            .put('/blogs/' + createdBlog1.id)
            .set('Authorization', token)
            .send(blogData)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
            .get('/blogs/' + createdBlog1.id)
            .expect(HTTP_STATUSES.OK200, createdBlog1)
    })

    it('shouldn`t update blog that no exist', async() => {
        const blogData = {
            name: 'Muslim',
            description: 'test-blog',
            websiteUrl: 'https://www.webSite.ru'
        }

        await request(app)
            .put('/blogs' + 111)
            .set('Authorization', token)
            .send(blogData)
            .expect(HTTP_STATUSES.NOT_FOUND_404)
    })

    it('should update blog with correct input model', async() => {
        const blogData = {
            name: 'MuslimAbubakr',
            description: 'test-blog',
            websiteUrl: 'https://www.webSite.ru'
        }

        await request(app)
            .put('/blogs/' + createdBlog1.id)
            .set('Authorization', token)
            .send(blogData)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
            .get('/blogs/' + createdBlog1.id)
            .expect(HTTP_STATUSES.OK200, {
                ...createdBlog1,
                name: 'MuslimAbubakr'
            })
    })
})