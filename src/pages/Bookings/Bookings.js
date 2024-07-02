import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { Pop } from "../../components/pop/pop";
import { DateTime } from "../../container/search-form/search-form";
import "./style.css";

export const Bookings = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [bookingToChange, setBookingToChange] = useState(null);

  const { bookings } = useSelector(state => state.bookingReducer);

  const nav = useNavigate();

  const handleDeleteBooking = booking => {
    setBookingToChange(booking);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteConfirmation(false);

    const res = await fetch("https://flight-booking-server-sand.vercel.app/flight/inquire-delete", {
      method: "POST",
      body: JSON.stringify({ id: bookingToChange._id }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) setBookingToChange(null);
    const data = await res.json();

    console.log("=========================RESPONSE DATA=====================");
    console.log(data);

    alert("Forwarded to admin for review");
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setBookingToChange(null);
  };

  const editHandler = booking => {
    nav("/Edit", {
      state: { booking },
    });
  };
  return (
    <div className="App">
      <Header />
      <div className="mainContainer">
        <div className="bookings">
          <div className="container">
            <h2>My Bookings</h2>
            <table class="table">
              {TableHeader()}
              <tbody>
                {bookings.map((booking, index) => {
                  if (booking === "successful") return TableRow(index, booking, handleDeleteBooking, editHandler);
                })}
              </tbody>
            </table>
          </div>

          <div>
            <h2>Booking inquiries</h2>
          </div>
          <div className="container-inquiries">
            <h4>Delete Bookings</h4>
            <table class="table caption-top bg-white rounded mt-2">
              {TableHeader()}
              <tbody>
                {bookings.map((booking, index) => {
                  if (booking.status === "delete") return TableRow(index, booking, handleDeleteBooking, editHandler);
                })}
              </tbody>
            </table>
          </div>

          <div className="container-inquiries">
            <h4>Change Bookings</h4>
            <table class="table caption-top bg-white rounded mt-2">
              {TableHeader()}
              <tbody>
                {bookings.map((booking, index) => {
                  if (booking === "edit") return TableRow(index, booking, handleDeleteBooking, editHandler);
                })}
              </tbody>
            </table>
          </div>

          {showDeleteConfirmation && (
            <Pop
              text={"Are you sure you want to delete the booking?"}
              okText={"Yes"}
              cancelText={"No"}
              cancelHandler={handleCancelDelete}
              yesHandler={handleConfirmDelete}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th scope="col">Full name</th>
        <th scope="col">Flight</th>
        <th scope="col">Departure Time</th>
        <th scope="col">Arrival Time</th>
        <th scope="col">passengers</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
  );
};

const TableRow = (index, booking, deleteHandler, editHandler) => {
  const time = new Date(new Date(booking.departureTime).getTime() + +booking.flightTime * 60 * 60 * 1000);

  return (
    <tr key={index}>
      <td>{booking.fullName}</td>
      <td>{booking.flightName}</td>
      <td>{DateTime(booking.departureTime)}</td>
      <td>{DateTime(time)}</td>
      <td>{booking.passengersInfo.length}</td>
      <td className="buttons">
        <button className="btn btn-primary" onClick={() => editHandler(booking)}>
          Edit
        </button>

        <button className="btn btn-danger" onClick={() => deleteHandler(booking)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
