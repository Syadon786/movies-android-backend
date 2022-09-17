import supertest from 'supertest'
import createServer from "../utils/server"

const app = createServer();

describe('movies/all', () => {
    describe('get all movies', () => {
        describe('given the database is not empty', () => {
            it('should return a 200 OK status', async () => {
                await supertest(app).get("/movie/all").expect(200)
            });
        })
    })
})