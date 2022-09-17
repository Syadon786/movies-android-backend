import supertest from 'supertest'
import createServer from "../utils/server"
import {connect} from "../db/database"
import mongoose from 'mongoose';

const app = createServer();

describe('movies', () => {
beforeAll(async () => {
    await connect();
})
    
    describe('get all movies', () => {
        describe('given the database is not empty', () => {
            it('should return a 200 OK status', async () => {
                await supertest(app).get("/movie/all").expect(200);
            });
        })
    })

afterAll(async () => {
    mongoose.disconnect();
})    
})