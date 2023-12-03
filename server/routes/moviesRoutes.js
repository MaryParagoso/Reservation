const express = require("express");
const router = express.Router();

const {
  getMovies,
  addMovies,
  updateMovie,
  deleteMovie,
  addManyMovies,
} = require("../controllers/moviesController");

router.get("/all", getMovies);
router.post("/add", addMovies);
router.post("/addManyMovies", addManyMovies);
router.put("/update", updateMovie);
router.delete("/delete", deleteMovie);

module.exports = router;
