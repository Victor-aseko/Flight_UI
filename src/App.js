import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { useSelector } from "react-redux";
import { Bookings } from "./pages/Bookings/Bookings";
import { EditForm } from "./pages/Bookings/edit-form";
import { Home } from "./pages/Home/home";
import { SignUp } from "./pages/SignUp.js/SignUp";
import { Admin } from "./pages/admin/Home";
import AddPassenger from "./pages/admin/addPassenger";
import TicketEditing from "./pages/admin/ticketEditing";
import { BookingPage } from "./pages/booking/booking";
import { Application } from "./pages/jobs/apply-page";
import { Jobs } from "./pages/jobs/jobs";
import { Login } from "./pages/login/Login";

const App = () => {
  const user = useSelector(state => state.authReducer.user);

  const renderRestrictedComponent = Component => {
    if (user) {
      return <Component />;
    } else {
      // If the user is not logged in, navigate to the home page
      return <Navigate to="/" />;
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Booking" element={<BookingPage />} />

        <Route path="/Admin" element={renderRestrictedComponent(Admin)} />
        <Route path="/TicketEdit" element={renderRestrictedComponent(TicketEditing)} />

        {/* <Route path="/AddPassenger" element={renderRestrictedComponent(AddPassenger)} /> */}
        <Route path="/Jobs" element={renderRestrictedComponent(Jobs)} />
        <Route path="/Apply" element={renderRestrictedComponent(Application)} />
        <Route path="/Bookings" element={renderRestrictedComponent(Bookings)} />
        <Route path="/Edit" element={renderRestrictedComponent(EditForm)} />
      </Routes>
    </Router>
  );
};

export default App;
