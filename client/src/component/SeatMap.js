// components/SeatMap.js
import React, { useState } from "react";
import { Button } from "antd";
import Seats from "./seats";
import "../stylesheets/seatmap.css";
import {
  Context,
  seatRow,
  seatButton,
  highlight,
  legend,
  unselectedButton,
  selectedButton,
  selectedSeats,
} from "../stylesheets/layout";
import { Layout } from "antd";

const { Content } = Layout;

const generateSeatData = () => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columns = ["1", "2", "3", "4", "5"];

  const seatData = rows.map((row) =>
    columns.map((column) => ({
      seat_name: row + column,
      availability: "available",
    }))
  );

  return seatData;
};

const SeatMap = ({ onSeatClick, seatData, bookedSeats }) => {
  const [seats, setSeats] = useState(generateSeatData());
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (rowIndex, colIndex, isReserve) => {
    const updatedSeats = [...seats];
    const seat = updatedSeats[rowIndex][colIndex];

    seat.availability =
      seat.availability === "available" ? "selected" : "available";

    setSeats(updatedSeats);

    onSeatClick(seat);
    toggleReservation(rowIndex, colIndex, isReserve);
  };

  const toggleReservation = (row, col, isReserved) => {
    if (!isReserved) {
      const seat = { row, col };
      const seatIndex = selectedSeats.findIndex(
        (selected) => selected.row === row && selected.col === col
      );

      if (seatIndex > -1) {
        const updatedSelectedSeats = [...selectedSeats];
        updatedSelectedSeats.splice(seatIndex, 1);
        setSelectedSeats(updatedSelectedSeats);
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  // console.log(seatData);

  return (
    <div style={{ display: "flex" }}>
      <div style={legend}>
        <h1>Legends:</h1>
        <div style={Context}>Seat not selected</div>
        <Button style={unselectedButton}>A0</Button>
        <div style={Context}>Seat selected</div>
        <Button style={selectedButton}>A0</Button>
        <div style={Context}>Seat reserved</div>
        <Button style={seatButton} disabled="true">
          A0
        </Button>
      </div>
      <div style={highlight}>
        <div className="seat-grid">
          {seatData.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((seat, colIndex) => (
                <Button
                  key={colIndex}
                  type={seat ? "danger" : "primary"}
                  className="seat"
                  onClick={() => handleSeatClick(rowIndex, colIndex, seat)}
                >
                  <Seats seatData={{ row: rowIndex, col: colIndex + 1 }} />
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
