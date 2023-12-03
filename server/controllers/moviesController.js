const Movie = require("../models/moviesModel");

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        // console.log(movies);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addMovies = async (req, res) => {
    const { movieTitle, cinemaNumber, startDate, isPremiere, duration, image } =
        req.body;
    try {
        const movie = await Movie.find({ movieTitle });
        if (movie.length > 0)
            return res.status(400).json("Movie already exist");
        const addedMovie = await Movie.create({
            movieTitle,
            cinemaNumber,
            startDate,
            isPremiere,
            duration,
            image,
        });
        res.status(200).json(addedMovie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addManyMovies = async (req, res) => {
    const moviesToAdd = req.body; // Assuming req.body is an array of movie objects

    try {
        // Check if any of the movies already exist
        // const existingMovies = await Movie.find({
        //     movieTitle: { $in: moviesToAdd.map(movie => movie.movieTitle) }
        // });

        // if (existingMovies.length > 0) {
        //     const duplicateTitles = existingMovies.map(movie => movie.movieTitle);
        //     return res.status(400).json({ message: `Movies with titles ${duplicateTitles.join(', ')} already exist` });
        // }

        // Create multiple movies
        const addedMovies = await Movie.create(moviesToAdd);

        res.status(200).json(addedMovies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const updateMovie = async (req, res) => {
    const {
        movieId,
        movieTitle,
        cinemaNumber,
        startDate,
        isPremiere,
        duration,
        image,
    } = req.body;

    try {
        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: movieId },
            {
                $set: {
                    movieTitle,
                    cinemaNumber,
                    startDate,
                    isPremiere,
                    duration,
                    image,
                },
            },
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(updatedMovie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteMovie = async (req, res) => {
    const { movieId } = req.body;

    try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getMovies, addMovies, updateMovie, deleteMovie, addManyMovies };
