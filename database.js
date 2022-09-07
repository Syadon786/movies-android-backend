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
    const cast = details.cast.split(sep=',').map((member) => {
        const temp = member.split(sep='#');
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

exports.queryMoviesForList = function(res) {
    Movie.find({}, {_id: 1 , title : 1, released_year: 1, plot: 1, poster : 1}, (err, movies) => {
        if(err) return res.send(err);
        res.send(movies)});
}

exports.queryMovieById = function(id, res) {
    Movie.find({_id: id}, (err, movie) => {
        if(err) return res.send(err);
        res.send(movie);
    });
};

exports.filterMovies = function(filter, res) {
    Movie.find({$or: [{title: {$regex: filter, $options: "i"}}, 
    {director: {$regex: filter, $options: "i"}}, 
    {released_year: {$regex: filter, $options: "i"}}]}, 
    {_id: 1 , title : 1, released_year: 1, plot: 1, poster : 1}, (err, result) => {
        if(err) return res.send(err);
        res.send(result);
    })
}
