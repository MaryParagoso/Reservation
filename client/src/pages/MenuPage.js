import React, { Component } from "react";
import MenuScreen from "../component/MenuScreen";
import ReservationPath from "../component/ReservationPath";
import CancellationPath from "../component/CancellationPath";

class MenuPage extends Component {
  constructor(props) {
    super(props);

    // Initialize state using the constructor
    this.state = {
      selectedOption: null,
      selectedDate: null,
      selectedReservation: null,
    };

    // Bind the method to the current instance
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleProceedClick = this.handleProceedClick.bind(this);
  }

  // Method to handle button click
  handleButtonClick(choice) {
    this.setState({
      selectedOption: choice,
    });
  }

  // Method to handle Proceed button click
  handleProceedClick() {
    // Handle the logic for proceeding after selecting a date
    // You can perform any necessary actions here

    // For example, you can navigate to the next screen or submit the reservation
    alert(`Proceeding with reservation on ${this.state.selectedDate}`);
  }

  render() {
    const { selectedOption, selectedDate, selectedReservation } = this.state;

    return (
      <div>
        {selectedOption === null ? (
          <MenuScreen onButtonClick={this.handleButtonClick} />
        ) : (
          <div>
            {selectedOption === "Reserve" ? (
              <ReservationPath
                selectedDate={selectedDate}
                onDateChange={(selectedDate) => this.setState({ selectedDate })}
              />
            ) : (
              <CancellationPath
                selectedReservation={selectedReservation}
                onReservationChange={(selectedReservation) =>
                  this.setState({ selectedReservation })
                }
              />
            )}

            {/* Place the Proceed button after the selected options */}
            {selectedOption && (
              <div>
                <p>Selected Option: {selectedOption}</p>
                {selectedOption === "Reserve" && selectedDate && (
                  <button onClick={this.handleProceedClick}>Proceed</button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default MenuPage;
