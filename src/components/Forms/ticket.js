import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { seatNumberGenerator } from "./seat-selection";

export const Ticket = () => {
  const { pendingBooking: flight, bookingUserInfo, seatsSelected } = useSelector(state => state.bookingReducer);
  const ticketRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ticketRef.current,
  });

  return (
    <>
      <div className="ticket-container" ref={ticketRef}>
        <div className="ticket airline">
          <div className="top">
            <h1 style={{ padding: "1rem 0rem" }}>boarding pass</h1>
            <div className="big">
              <p className="from">{flight.flightName}</p>
            </div>
            <div className="top--side">
              <i className="fas fa-plane"></i>
              <p>{flight.origin}</p>
              <p>{flight.destination}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="column">
              <div className="row row-1">
                <p>
                  <span>Flight Number</span>
                  {flight.flightNo}
                </p>
              </div>
              <div className="row-2">
                <div>
                  <p>
                    <span>Boards</span>
                    {`${new Date(new Date(flight.departureTime).getTime() - 30 * 60 * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}`}
                  </p>
                </div>
                <div>
                  <p>
                    <span>Departs</span>
                    {new Date(flight.departureTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
                  </p>
                </div>
                <div>
                  <p>
                    <span>Arrives</span>
                    {/* {new Date(flight.departureTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })} */}
                    {new Date(new Date(flight.departureTime).getTime() + flight.flightTime * 60 * 60 * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
                  </p>
                </div>
              </div>

              <div className="row row-3">
                <p>
                  <span>class</span>
                </p>
                <p>{flight.class}</p>
              </div>

              {bookingUserInfo.map((passenger, index) => (
                <div key={index} className="row-2">
                  <p>
                    <span>Passenger</span>
                    {passenger.firstName + " " + passenger.lastName}
                  </p>
                  <p className="row--center">
                    <span>Seat</span>
                    {seatNumberGenerator(seatsSelected[index].row, seatsSelected[index].col)}
                  </p>
                </div>
              ))}
            </div>
            <div className="bar--code"></div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", borderRadius: "12px", padding: "1rem 0rem", backgroundColor: "rgb(252, 252, 252, 0.8)"}}>
        <button onClick={handlePrint}>print Ticket</button>
      </div>
    </>
  );
};
