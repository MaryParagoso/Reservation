const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const moviesRoutes = require("./routes/moviesRoutes");
const ticketsRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/users", userRoutes);

mongoose.set({ strictQuery: true });
mongoose
  .connect(
    "mongodb+srv://bacoldeannahaws:aDdF5EGN9luxZFfz@cluster0.pbdtb2q.mongodb.net/MovieReservation"
  )
  .then(() => {
    app.listen(
      process.env.PORT || 5000,
      console.log("Now connected to MongoDB Atlas"),
      console.log(`Server is running at port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
