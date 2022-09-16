import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import logger from "../logger";
import Movie, {MovieDocument} from "./movie";

dotenv.config({ path: `.env` });

if(process.env.DATABASE_URL === undefined) {
    logger.error("Database url is undefined.");
    process.exit(1);
} 
const dbUrl : string = process.env.DATABASE_URL;

export function connect() : Promise<void> {
    return mongoose
    .connect(dbUrl)
    .then(() => {
        logger.info("Connected to database.");
    }).catch((err) => {
        logger.error(err);
        process.exit(1);
    });
}


export function addMovieDetails(details : any) : Promise<string | Error> {
    return new Promise((resolve, reject) =>{
        const cast = details.cast.split(',').map((member : string) => {
            const temp = member.split('#');
            return {actorName: temp[0],
            characterName: temp[1]};
        });
        const movie = new Movie({
            title: details.title,
            released_year: details.released_year,
            plot: details.plot,
            genre: details.genres,
            playtime: details.playtime,
            director: details.director,
            cost: details.cost,
            profit: details.profit,
            cast: cast,
            poster: details.poster
        });
        movie.save().then(() => {
            logger.info("A new movie is added to the database.");
            resolve("A new movie is added to the database.");
        }).catch((err) => {
            logger.error("db error", err);
            reject(err);
        });
    }) 
};

export function queryAllMovies() : Promise<Array<MovieDocument> | Error> {
    return new Promise((resolve, reject) => {
        Movie.find({}, (err : Error, movies : Array<MovieDocument>) => {
            if(err) {
                logger.error(err);
                return reject((err)) 
            };
            resolve(movies);
        });
    })
}

export function queryMoviesForList() : Promise<Array<MovieDocument> | Error>  {
    return new Promise((resolve, reject) => {
        Movie.find({}, {_id: 1 , title : 1, released_year: 1, plot: 1, poster : 1}, (err : Error, movies : Array<MovieDocument>) => {
            if(err) {
                logger.error(err);
                return reject(err); 
            }
            resolve(movies);
        })
    })
}

export function queryMovieById(id : string) : Promise<MovieDocument | Error> {
    return new Promise((resolve, reject) => {
        Movie.find({_id: id}, (err : Error, movie : MovieDocument) => {
            if(err) {
                logger.error(err);
                return reject(err);
            }
            resolve(movie);
        });
    })
};

export function filterMovies(filter : string) {
    return new Promise((resolve, reject) => {
        Movie.find({$or: [{title: {$regex: filter, $options: "i"}}, 
        {director: {$regex: filter, $options: "i"}}, 
        {released_year: {$regex: filter, $options: "i"}}]}, 
        {_id: 1 , title : 1, released_year: 1, plot: 1, poster : 1}, (err : Error, result : Array<MovieDocument>) => {
            if(err) {
                logger.error(err);    
                return reject(err);
            }
            resolve(result);
        })
    })
}
