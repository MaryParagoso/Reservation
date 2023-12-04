import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import MenuScreen from "../component/MenuScreen";
import CancellationPath from "../component/CancellationPath";

function MenuPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState("asd");
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Method to handle button click
  const handleButtonClick = (choice) => {
    setSelectedOption(choice);
  };

  // Method to handle Proceed button click
  const handleProceedClick = () => {
    // Handle the logic for proceeding after selecting a date
    // You can perform any necessary actions here
    alert(`Proceeding with reservation on ${selectedDate}`);
  };

  return (
    <div>
      {selectedOption === null ? (
        <MenuScreen onButtonClick={handleButtonClick} />
      ) : (
        <div>
          {selectedOption === "Reserve" ? (
            Navigate("/reservationDate")
          ) : (
            <CancellationPath
              selectedReservation={selectedReservation}
              onReservationChange={(selectedReservation) =>
                setSelectedReservation(selectedReservation)
              }
            />
          )}
        </div>
      )}
    </div>
  );
}

export default MenuPage;
