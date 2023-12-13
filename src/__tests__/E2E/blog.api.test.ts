import request from 'supertest'
import { app } from '../..'

describe('/course', () => {
    
    it('should return 200 and empty array', () => {
        request(app)
            .get('/courses')
            .expect(200, [])
    }) 
})