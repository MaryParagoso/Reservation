import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import MenuPage from "./pages/MenuPage";
import ReservationPath from "./component/ReservationPath";
import SeatLayout from "./pages/SeatLayout";
import Movielist from "./pages/Movielist";
import ReservationConfirmation from "./pages/ReservationConfirmation.js";


const App = () => {

  const [selectedDate, setSelectedDate] = useState()
  function getSelectedDate(date) {
    setSelectedDate(date);
    console.log(date)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/menu" element={<MenuPage />}></Route>
        <Route path="/reservationDate" element={<ReservationPath getSelectedDate={getSelectedDate}/>}></Route>
        <Route path="/movielist" element={<Movielist selectedDate={selectedDate}/>}></Route>
        <Route path="/:id" element={<SeatLayout />}></Route>

        <Route
          path="/confirmation/:id"
          element={<ReservationConfirmation />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
