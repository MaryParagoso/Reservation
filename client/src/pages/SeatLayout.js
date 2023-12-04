// SeatLayout.js
import React, { useEffect, useState } from "react";
import SeatMap from "../component/SeatMap";
import seatData from "../component/SeatData";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SeatLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  const [seatArray, setSeatArray] = useState([]); 
  const [bookedSeats, setBookedSeats] = useState([]);

  const [seats, setSeats] = useState(() =>
  Array(8)
      .fill(0)
      .map(() => Array(5).fill(false))
);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tickets/all");
      
        if (!response.ok) {
          throw new Error(`Failed to fetch tickets. Status: ${response.status}`);
        }
      
        const tickets = await response.json();
        // console.log(tickets);
        setTicketList(tickets);

        const cols = "ABCDE";

        for (const item of tickets) {
          if (item.movieId === data._id) {
              for (const item2 of item.seats) {
                  if (!seatArray.includes(item2)) {
                      const col = cols.indexOf(item2[0]);
                      const row = parseInt(item2.slice(1)) - 1;
                      if (
                          row >= 0 &&
                          row < 8 &&
                          col >= 0 &&
                          col < 5
                      ) {
                          const updatedSeats = [...seats];
                          updatedSeats[row][col] = true;
                          setSeats(updatedSeats);
                      }
                  }
              }
          }
      }
        // Handle the retrieved tickets as needed in your client-side code
      } catch (error) {
        console.error("Error fetching tickets:", error);
        // Handle the error in your client-side code
      }
      
    };

    fetchMovies();
  }, []);

  const reserveTickets = async () => {
    navigate(`/confirmation/${data._id}`, { state: { data: selectedSeats, movieData: data, tickets: ticketList} });
  };

  const handleSeatClick = (selectedSeat) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(selectedSeat)
        ? prevSelectedSeats.filter((seat) => seat !== selectedSeat)
        : [...prevSelectedSeats, selectedSeat]
    );
  };

  const updateSeats = (data) => {
    const selectedSeat = { row: data.rowCol.row, col: data.rowCol.col };
    const seatIndex = selectedSeats.findIndex(
        (seat) =>
            seat.row === data.rowCol.row && seat.col === data.rowCol.col
    );

    if (seatIndex !== -1) {
        const updatedSelectedSeats = [...selectedSeats];
        updatedSelectedSeats.splice(seatIndex, 1);
        setSelectedSeats(updatedSelectedSeats);
    } else {
        setSelectedSeats([...selectedSeats, selectedSeat]);
    }
};

  


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        height: "100vh",
        backgroundImage: `url("https://raw.githubusercontent.com/kishan0725/AJAX-Movie-Recommendation-System-with-Sentiment-Analysis/master/static/image.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center ",
      }}
    >
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <h1 style={{ fontWeight: "bold", color: "white" }}>Seat Map</h1>
        <div>
          <SeatMap
            seatData={seats}
            onSeatClick={handleSeatClick}
            bookedSeats={bookedSeats}
            rowColData={updateSeats}
          />
            <button onClick={reserveTickets}>Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
