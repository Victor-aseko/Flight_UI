import React, { useState } from "react";
import discover from "../../img/discover.png";
import mastercard from "../../img/mastercard1.png";
import mpesa from "../../img/mpesa.png";
import paypal from "../../img/paypal.png";
import visa from "../../img/visa.png";

import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bookingActions } from "../../store/bookingSlice";
import { Pop } from "../pop/pop";

export const Payment = ({ setSelectedTab }) => {
  const { seatsSelected, bookingUserInfo: passengers, pendingBooking } = useSelector(state => state.bookingReducer);
  const [validation, setValidation] = useState({ cardHolderFullName: true, cardNumber: true, cvv: true });
  const [paymentForm, setPaymentForm] = useState({
    cardHolderFullName: "",
    cardNumber: "",
    month: "",
    year: "",
    cvv: "",
  });
  const [showPop, setShowPop] = useState(false);

  const okHandler = () => setShowPop(false);
  const dispatch = useDispatch();
  const submitHandler = async e => {
    try {
      e.preventDefault();
      const validationObj = {
        cardHolderFullName: !!paymentForm.cardHolderFullName,
        cardNumber: !!paymentForm.cardNumber,
        cvv: !!paymentForm.cvv,
      };
      setValidation(validationObj);
      const isValid = Object.values(validationObj).every(isValid => isValid);
      if (!isValid) return;
      if (+pendingBooking.passengers !== passengers.length || seatsSelected.length !== +pendingBooking.passengers) {
        return setShowPop(true);
      }

      const res = await fetch("https://flight-booking-server-3zln.vercel.app/flight/create-booking", {
        method: "POST",
        body: JSON.stringify(jsonObj(pendingBooking, passengers, seatsSelected)),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.booking)
        dispatch(
          bookingActions.createBookings({
            ...data.booking,
            departureTime: pendingBooking.departureTime,
            flightName: pendingBooking.flightName,
            flightTime: pendingBooking.flightTime,
            status: "successful",
          })
        );
      setSelectedTab("flightTicket");
    } catch (error) {
      console.log("====================================error===========================");
      console.log(error);
    }
  };

  const changeHandler = e => {
    const { value, name } = e.target;

    setPaymentForm(prev => {
      return { ...prev, [name]: value };
    });
  };
  const focusHandler = () => {
    setValidation({ cardHolderFullName: true, cardNumber: true, month: true, year: true, cvv: true });
  };
  const img = [visa, mastercard, discover, paypal, mpesa];
  return (
    <div className="payment-container">
    <div className="form-content">
      <div className="payment-wrapper">
        <div className="tab-wrapper">
          <form encType="text/plain" method="get" target="_blank" onSubmit={submitHandler}>
            <div className="cards">
              {/* <p>Accepted cards:</p> */}
              {cards(img)}
            </div>
            <div className="fieldset half">
              <div className="field">
                <label htmlFor="full-name">Card Holder Full Name</label>
                <input
                  id="full-name"
                  className="form-control"
                  placeholder="Satoshi Nakamoto"
                  name="cardHolderFullName"
                  style={{ border: !validation.cardHolderFullName ? "1px solid red" : "" }}
                  onFocus={focusHandler}
                  type="text"
                  value={paymentForm.cardHolderFullName}
                  onChange={changeHandler}
                />
              </div>

              <div className="field">
                <label htmlFor="credit-card-num">Card Number</label>
                <input
                  id="credit-card-num"
                  className="form-control"
                  placeholder="1111-2222-3333-4444"
                  type="number"
                  name="cardNumber"
                  style={{ border: !validation.cardNumber ? "1px solid red" : "" }}
                  value={paymentForm.cardNumber}
                  onChange={changeHandler}
                  onFocus={focusHandler}
                />
              </div>
            </div>
            <div>
              <p className="expires">Expires on:</p>
              <div className="card-experation">
                <div className="fieldset quarter">
                  <div className="field">
                    <label htmlFor="expiration-month">Month</label>
                    <select
                      id="expiration-month"
                      style={{ width: "100%", padding: "0px 10px" }}
                      className="form-control"
                      name="month"
                      onChange={e =>
                        setPaymentForm(prev => {
                          return { ...prev, month: e.target.value };
                        })
                      }
                      onFocus={focusHandler}
                    >
                      <option value="">Month:</option>
                      <option value="">January</option>
                      <option value="">February</option>
                      <option value="">March</option>
                      <option value="">April</option>
                      <option value="">May</option>
                      <option value="">June</option>
                      <option value="">July</option>
                      <option value="">August</option>
                      <option value="">September</option>
                      <option value="">October</option>
                      <option value="">November</option>
                      <option value="">Decemeber</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="expiration-year">Year</label>
                    <select
                      id="experation-year"
                      style={{ width: "100%" ,padding: "0px 10px" }}
                      className="form-control"
                      name="year"
                      onChange={e =>
                        setPaymentForm(prev => {
                          return { ...prev, year: e.target.value };
                        })
                      }
                      onFocus={focusHandler}
                    >
                      <option value="">Year</option>
                      <option value="">2023</option>
                      <option value="">2024</option>
                      <option value="">2025</option>
                      <option value="">2026</option>
                    </select>
                  </div>
                  <div className="field">
                    <label for="cvv">CVV</label>
                    <input
                      style={{ width: "100%", border: !validation.cvv ? "1px solid red" : "" }}
                      id="cvv"
                      className="form-control"
                      placeholder="415"
                      type="text"
                      name="cvv"
                      value={paymentForm.cvv}
                      onFocus={focusHandler}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="field">
                    <Link
                      className="cvv-info"
                      href="https://en.wikipedia.org/wiki/CVV#:~:text=Card%20Verification%20Value%2C%20also%20known,Renaissance%20photographer%20and%20portrait%20artist"
                      target="_blank"
                    >
                      What is CVV?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              name="btn-primary"
              value="Next"
              id="round_trip_btn"
              className="btn-primary btn-submit-form btn-rnd-trip"
              // onClick={handlerSubmit}
            >
              Pay Now
            </button>
          </form>
          <div>
            <p className="footer-text">
              <FaLock />
              Your credit card information is encrypted
            </p>
          </div>
        </div>
      </div>
      {showPop && (
        <Pop text={"Please fill in the previous forms details before making payments"} okText={"Ok"} yesHandler={okHandler} doNotShowCancel={true} />
      )}
    </div>
    </div>
  );
};

const jsonObj = (pendingBooking, passengers, seatsSelected) => {
  return {
    bookingId: pendingBooking._id,
    fullName: passengers[0].firstName + " " + passengers[0].lastName,
    class: pendingBooking.class,
    passengers: pendingBooking.passengers,
    passengersInfo: pendingBooking.passengersInfo,
    payment: pendingBooking.fare,
    paymentMethod: "VISA",
    seatBooked: seatsSelected,
  };
};
const cards = data => {
  return data.map((card, index) => (
    <div key={index} className="card-logos">
      <img src={card} alt={"card"} style={data.length === index + 1 ? { height: " 64px", width: "74px" } : {}} />
    </div>
  ));
};
