import supertest from 'supertest'
import {Express} from 'express'; 
import createServer from "../utils/server"
import {connect} from "../db/database"
import mongoose from 'mongoose';

const app : Express = createServer();

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

    describe('get all movies', () => {
        describe('given the database is empty', () => {
            it('should return a 404 not found status', async () => {
                await supertest(app).get("/movie/all").expect(404);
            });
        })
    })

    describe('get all movies for list', () => {
        describe('given the database is not empty', () => {
            it('should return a 200 OK status', async () => {
                await supertest(app).get("/movie/list").expect(200);
            });
        })
    })

    describe('get all movies for list', () => {
        describe('given the database is empty', () => {
            it('should return a 404 not found status', async () => {
                await supertest(app).get("/movie/list").expect(404);
            });
        })
    })

    describe('get a movie by id', () => {
        describe('given the movie with specified id exists', () => {
            it('should return a 200 OK status', async () => {
                const id : string = "6314db85afca4782eb65aa78";
                const {body, statusCode} = await supertest(app)
                .get(`/movie/${id}`);

                expect(statusCode).toBe(200);
                expect(body[0]._id).toBe(id);
            });
        })
    })

    describe('get a movie by id', () => {
        describe('given the movie with specified id does not exists', () => {
            it('should return a 404 not found status', async () => {
                const id : string = "6314db85afca4782eb659999";
                const {body, statusCode} = await supertest(app)
                .get(`/movie/${id}`);

                expect(statusCode).toBe(404);
                expect(body).toEqual({});
            });
        })
    })

    describe('get specific movies with filters', () => {
        describe('given there are movies that the filter matches', () => {
            it('should return a 200 OK status', async () => {
                const filter : string = "Csillagok háborúja";
                const {body, statusCode} = await supertest(app)
                .get(`/movie/filter/${filter}`);

                expect(statusCode).toBe(200);
                expect(body).not.toEqual({});
            });
        })
    })

    describe('get specific movies with filters', () => {
        describe('given there are no movies existing that the filter matches', () => {
            it('should return a 404 not found status', async () => {
                const filter : string = "sosemleszilyenmovie";
                const {body, statusCode} = await supertest(app)
                .get(`/movie/filter/${filter}`);

                expect(statusCode).toBe(404);
                expect(body).toEqual({});
            });
        })
    })

afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
})    
})