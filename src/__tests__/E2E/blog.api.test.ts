import request from 'supertest'
import { app } from '../../app'

describe('/course', () => {
    
    it('should return 200 and empty array', () => {
        request(app)
            .get('/')
            .expect(200, [])
    }) 
})