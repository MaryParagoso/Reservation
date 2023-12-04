import React, { useEffect, useState } from "react";
import { Layout, message } from "antd";
import {
  contentStyle,
  centerContent,
  highlight,
  reservationButton,
  Context,
  Context2,
} from "../stylesheets/layout";
import ReservationPriceCalculator from "../component/ReservationPriceCalculator";
import { useLocation, useNavigate } from "react-router-dom";

const { Content } = Layout;

const ReservationConfirmation = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  const [seniorCitizenStatus, setSeniorCitizenStatus] = useState(
    Array(data.data.length).fill(false)
  );

  const handleSeatButtonClick = (seatIndex) => {
    const updatedStatus = seniorCitizenStatus.map((status, index) =>
      index === seatIndex ? !status : status
    );
    setSeniorCitizenStatus(updatedStatus);
  };

  const reserveTickets = async () => {
    if (!data || !data.data || !data.movieData || !data.movieData.data) {
      console.error("Invalid data structure");
      return;
    }

    const ticketData = data.tickets.length ? parseInt(data.tickets[data.tickets.length - 1].ticketNumber) + 1 : 143;

    // console.log(ticketData);

    try {
      const seatNamesArray = data.data.map((seat) => seat.seat_name);

      const requestBody = {
        ticketNumber: ticketData,
        movieId: data.movieData.data._id,
        seats: seatNamesArray,
        numSenior: seniorCitizenStatus.length,
      };

      console.log(requestBody);

      const response = await fetch("http://localhost:5000/api/tickets/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to add ticket. Status: ${response.status}`);
      }

      const addedTicket = await response.json();
      message.success(`${addedTicket.ticketNumber} reserved`);
      // console.log(data);
      navigate(`/${data.data._id}`, { state: { data: data.data, movieData: data.movieData, tickets: data.tickets} });
    } catch (error) {
      console.error("Error adding ticket:", error);
      message.error("Failed to add ticket. Please try again.");
    }
  };

  console.log(data);

  return (
    <div>
      <Layout>
        <Content style={contentStyle}>
          <div style={centerContent}>
            <h1 style={Context2}>Reservation Confirmation</h1>
            <div style={highlight}>
              <p style={Context}>Date: {data.movieData.data.startDate}</p>
              <p style={Context}>
                Cinema Number: {data.movieData.data.cinemaNumber}
              </p>
              <p style={Context}>
                Movie Name: {data.movieData.data.movieTitle}
              </p>
              {data.movieDetails ? (
                <p>Premium: {data.movieData.data.genre}</p>
              ) : null}
              <p style={Context}>Time Slots: {data.movieData.data.startDate}</p>
            </div>
            <p style={Context2}>Selected Seats:</p>

            {data.data.map((seat, index) => (
              <div key={index}>
                <button
                  onClick={() => handleSeatButtonClick(index)}
                  style={{
                    backgroundColor: seniorCitizenStatus[index]
                      ? "maroon"
                      : "transparent",
                    fontSize: "23px",
                    width: "250px",
                    height: "40px",
                    color: "gold",
                    borderColor: "#b20710",
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "10px",
                    margin: "1px",
                  }}
                >
                  {seat.seat_name}{" "}
                  {seniorCitizenStatus[index] ? "(Senior Citizen)" : ""}
                </button>
              </div>
            ))}

            <ReservationPriceCalculator
              seatNumbers={data}
              seniorCitizenStatus={seniorCitizenStatus}
              isPremium={data.movieData.data.isPremiere}
              onPriceChange={(newPrice) => setTotalPrice(newPrice)}
            />
            <button onClick={reserveTickets} style={reservationButton}>
              Generate Reservation
            </button>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default ReservationConfirmation;
