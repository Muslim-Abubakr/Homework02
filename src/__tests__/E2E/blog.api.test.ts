import request from 'supertest'
import { app } from '../../app'

describe('/blogs', () => {
    beforeAll(async ()=> {
        await request(app).delete('/testing/all-data')
    })
    
    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/blogs')
            .expect(200, [])
    }) 

    it('should return 404 for not existing blog', async () => {
        await request(app)
            .get('/blogs/111')
            .expect(404)
    })

    it('should create blog with correct input data', async () => {
        const createResponse = await request(app)
            .post('/blogs')
            .send({
                name: 'Muslim',
                description: 'test-blog',
                websiteUrl: 'https://www.webSite.ru'
            })
        const createdBlog = createResponse.body

        expect(createdBlog).toEqual(({}))
    })

    it('shouldn`t create blog with incorrect input data', async() => {
        await request(app)
            .post('/blogs')
            .send({
                name: 'Muslim',
                description: '',
                websiteUrl: 'https://www.webSite.ru'
            })
            .expect(401)
    })
})