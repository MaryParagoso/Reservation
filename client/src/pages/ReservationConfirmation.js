import React, { useState } from 'react';
import { Layout } from 'antd';
import { contentStyle, centerContent, highlight, reservationButton, Context, Context2 } from '../stylesheets/layout';
import { ReservationDetails } from '../component/ReservationDetails';
import ReservationPriceCalculator from '../component/ReservationPriceCalculator';
import UniqueIDGenerator from '../component/UniqueIDGenerator';

const { Content } = Layout;

const ReservationConfirmation = () => {
  // Destructure values from ReservationDetails
  const { date, cinemaNumber, movieName, isPremium, timeSlots, seatNumbers } = ReservationDetails;

  // State to track senior citizen status
  const [seniorCitizenStatus, setSeniorCitizenStatus] = useState(Array(seatNumbers.length).fill(false));

  // State to store total price
  const [totalPrice, setTotalPrice] = useState(0);

  // Handle button click for a seat
  const handleSeatButtonClick = (seatIndex) => {
    // Toggle senior citizen status for the clicked seat
    const updatedStatus = seniorCitizenStatus.map((status, index) =>
      index === seatIndex ? !status : status
    );
    setSeniorCitizenStatus(updatedStatus);
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    seatNumbers.forEach((seat, index) => {
      const ticketPrice = isPremium ? 500 : 350;
      const discountedPrice = seniorCitizenStatus[index] ? ticketPrice * 0.8 : ticketPrice;

      totalPrice += discountedPrice;
    });

    return totalPrice;
  };

  // Function to generate a reservation
  // Function to generate a reservation
const generateReservation = () => {
  const reservationNumber = UniqueIDGenerator.generateReservationID(date);

  // Create an array to store seat and ticket information
  const seatInfo = seatNumbers.map((seat, index) => {
    const ticketNumber = UniqueIDGenerator.generateTicketID(cinemaNumber, date);
    return { seatNumber: seat.seatNumber, ticketNumber };
  });

  // Display a prettified message box
  window.alert(`
    Reservation Details:
    Reservation Number: ${reservationNumber}
    Movie Name: ${movieName}
    Cinema Number: ${cinemaNumber}
    Date: ${date}
    Time Slots: ${timeSlots.join(', ')}
    Total Price: ${totalPrice} PHP
    Selected Seats and Ticket Numbers:
    ${seatInfo.map((info) => `Seat ${info.seatNumber}: Ticket ${info.ticketNumber}`).join('\n')}
  `);
};

  return (
    <div>
      <Layout>
      <Content style={contentStyle}>
          <div style={centerContent}>
            <h1 style={Context2}>Reservation Confirmation</h1>
            <div style={highlight}>
              <p style={Context}>Date: {date}</p>
              <p style={Context}>Cinema Number: {cinemaNumber}</p>
              <p style={Context}>Movie Name: {movieName}</p>
              {isPremium ? <p>Premium: {isPremium.toString()}</p> : null}
              <p style={Context}>Time Slots: {timeSlots.join(', ')}</p>
              </div>
            <p style={Context2}>Selected Seats:</p>

            {seatNumbers.map((seat, index) => (
              <div key={index}>
                <button
                  onClick={() => handleSeatButtonClick(index)}
                  style={{ 
                    backgroundColor: seniorCitizenStatus[index] ? 'maroon' : 'transparent',
                    fontSize: '23px',
                    width: '250px',
                    height: '40px',
                    color: 'gold',
                    borderColor: '#b20710',
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '10px',
                    margin:'1px',
                  }}
                >
                  {seat.seatNumber} {seniorCitizenStatus[index] ? '(Senior Citizen)' : ''}
                </button>
              </div>
            ))}

            <ReservationPriceCalculator
              seatNumbers={seatNumbers}
              seniorCitizenStatus={seniorCitizenStatus}
              isPremium={isPremium}
              onPriceChange={(newPrice) => setTotalPrice(newPrice)}
            />
            <button onClick={generateReservation} style={reservationButton}>
              Generate Reservation
            </button>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default ReservationConfirmation;



