const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticketNumber: Number,
  movieId: String,
  seats: [
    {
      type: String,
    },
  ],
  numSenior: Number,
});

module.exports = mongoose.model("Ticket", ticketSchema);
