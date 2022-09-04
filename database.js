const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

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

exports.addMovieDetails = function(details, res) {
    const cast = [];
    details.cast.split(sep=',').forEach((member) => {
        const temp = member.split(sep='#');
        cast.push({actorName: temp[0],
        characterName: temp[1]})
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
        console.log("A new movie is added to the database.");
        res.send("A new movie is added to the database.");
    }).catch((err) => {
        console.error(err);
        res.send(err);
    });
};

exports.queryAllMovies = function(res) {
    Movie.find({}, (err, movies) => {
        if(err) return res.send(err);
        res.send(movies);
    });
}
