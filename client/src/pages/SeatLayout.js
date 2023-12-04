// SeatLayout.js
import React, { useEffect, useState } from "react";
import SeatMap from "../component/SeatMap";
// import seatData from "../component/SeatData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout } from 'antd';
import { contentStyle, center, proceedButton, Context2 } from '../stylesheets/layout';
import { Button } from "antd";
import { Context, seatRow, seatButton, highlight, legend, unselectedButton, selectedButton, selectedSeats } from '../stylesheets/layout';
// import { Layout } from 'antd';

const { Content } = Layout;

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
    navigate(`/confirmation/${data.data._id}`, { state: { data: selectedSeats, movieData: data, tickets: ticketList} });
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
console.log(data);

  return (
      <div >
        <Layout>
        <div style={{ display: 'flex' }}>
            <Content style={contentStyle}>
              <div style={center}>
                <h1 style={Context2}>Seat Map</h1>
                <div>
                  <SeatMap
                    seatData={seats}
                    onSeatClick={handleSeatClick}
                    bookedSeats={bookedSeats}
                    rowColData={updateSeats}
                  />
                  <button style={proceedButton} onClick={reserveTickets}>Proceed</button>
                </div>
              </div>
            </Content>
          </div>
        </Layout>
      </div>
    );
};

export default SeatLayout;
