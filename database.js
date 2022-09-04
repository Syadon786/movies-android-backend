const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MoviesDB');

const movieSchema = mongoose.Schema({
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

const Movie = mongoose.model('movie', movieSchema);
