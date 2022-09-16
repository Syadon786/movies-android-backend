import mongoose from 'mongoose';

interface Actor {
    actorName: string;
    characterName: string;
}

export interface MovieDocument extends mongoose.Document {
    title: string;
    released_year: string;
    plot: string;
    genre: Array<string>;
    playtime: string;
    director: string;
    cost: string;
    profit: string;
    cast: Array<Actor>;
    poster: string;
}

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    released_year: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    playtime: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    profit: {
        type: String,
        required: true
    },
    cast: {
        type: [{
            actorName : String,
            characterName: String
        }],
        required: true
    },
    poster: {
        type: String,
        required: true
    }
});

const Movie = mongoose.model<MovieDocument>('movie', movieSchema);

export default Movie;