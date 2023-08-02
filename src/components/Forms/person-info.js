import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { bookingActions } from "../../store/bookingSlice";
import countryCodes from "../../PHONEDATA.json";
import { FaTrash } from "react-icons/fa";
import { Pencil } from "react-bootstrap-icons";

export const PersonlInfo = ({ setSelectedTab, tab, action, booking }) => {
  const { bookingUserInfo, pendingBooking } = useSelector(state => state.bookingReducer);
  const [userInfo, setUserInfo] = useState({ title: "Mr.", firstName: "", lastName: "", dob: "", phoneNo: "", email: "" });
  const [personInfo, setPersonalInfo] = useState();
  const [valid, setValid] = useState({ title: true, firstName: true, lastName: true, dob: true });
  const [selectedCountryCode, setSelectedCountryCode] = useState("");

  const [passengerBookings, setPassengersBookings] = useState();
  const targetDivRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setPassengersBookings(booking);
    setUserInfo(bookingUserInfo[0]);
  }, [booking, bookingUserInfo]);

  const validHandler = () => {
    const validationObj = {
      title: !!userInfo.title,
      firstName: !!userInfo.firstName,
      lastName: !!userInfo.lastName,
      dob: !!userInfo.dob,
    };
    setValid(validationObj);
    const isValid = Object.values(validationObj).every(isValid => isValid);
    return isValid;
  };

  const handlerSubmit = () => {
    const isValid = validHandler();
    if (!isValid || (tab === "addPassenger" && +pendingBooking.passengers !== bookingUserInfo.length)) return;
    console.log("-------------------USER INFO---------------------");
    if (tab !== "addPassenger") {
      console.log(userInfo);
      dispatch(bookingActions.createUserBookigInfo(userInfo));
      if (!action) {
        dispatch(
          bookingActions.createPendingBooking({
            ...pendingBooking,
            passengersInfo: [
              { fullName: userInfo.firstName + " " + userInfo.lastName, email: userInfo.email, phoneNo: userInfo.phoneNo, dob: userInfo.dob },
            ],
          })
        );
      } else {
        setPersonalInfo(userInfo);
      }

      if (pendingBooking.passengers > 1) {
        setUserInfo({ title: "Mr.", firstName: "", lastName: "", dob: "", phoneNo: "", email: "" });
        return setSelectedTab("addPassenger");
      } else setSelectedTab("seatSelect");
    } else setSelectedTab("seatSelect");
  };
  const addHandler = () => {
    const isValid = validHandler();
    if (!isValid) return;
    if (!action) dispatch(bookingActions.createPassengers(userInfo));
    else
      setPassengersBookings(prev => {
        console.log("======================PREVIOUS VALUE==============================");
        console.log(prev);
        const passengersInfo = {
          dob: userInfo.dob,
          email: userInfo.email,
          fullName: userInfo.firstName + " " + userInfo.lastName,
          phoneNo: userInfo.phoneNo,
        };
        const passengersInfos = passengerBookings ? [...passengerBookings?.passengersInfo, passengersInfo] : [passengersInfo];
        return { ...prev, passengersInfo: passengersInfos };
      });
    if (+pendingBooking.passengers - bookingUserInfo.length !== 1)
      setUserInfo({ title: "Mr.", firstName: "", lastName: "", dob: "", phoneNo: "", email: "" });
  };

  const changeHandler = e => {
    const { value, name } = e.target;
    if (name === "countryCode") {
      setSelectedCountryCode(value);
    } else {
      setUserInfo(prev => {
        return { ...prev, [name]: value };
      });
    }
  };

  const focusHandler = () => {
    setValid({ title: true, firstName: true, lastName: true, dob: true });
  };

  const Edithandler = async () => {
    const jsonObj = {
      fullName: personInfo.firstName + " " + personInfo.lastName,
      passengersInfo: passengerBookings.passengersInfo,
      passengers: passengerBookings.passengersInfo.length,
      id: passengerBookings._id,
    };
    console.log(jsonObj);
    const res = await fetch("https://flight-booking-server-3zln.vercel.app/flight/inquire-edit", {
      method: "POST",
      body: JSON.stringify(jsonObj),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log("=========================RESPONSE DATA=====================");
    console.log(data);
    dispatch(bookingActions.updateBookings(data));
  };

  return (
    <div className="form-content" ref={targetDivRef}>
      <div id="psnlInfo" className="booking-tab-content active">
        <div className="tab-wrapper">
          <div id="rndTrip" className="pill-tab-content active">
            <p>
              {tab === "addPassenger"
                ? action
                  ? "Added, edit or remove existing passengers "
                  : `please fill in the details of ${+pendingBooking.passengers - 1} passengers`
                : "Please make sure that you fill in the name that is in your passport."}
            </p>
            <div className="fieldset quarter">
              <div className="field">
                <label htmlFor="rndTripFom" id="lbl_rndTripFrom" aria-label="From">
                  Title*
                </label>
                <Form.Control
                  as="select"
                  name="title"
                  placeholder="title"
                  value={userInfo?.title}
                  onChange={changeHandler}
                  style={!valid.title ? { border: "1px solid red" } : { padding: "0px 10px" }}
                  onFocus={focusHandler}
                >
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Miss</option>
                </Form.Control>
              </div>

              <div className="field">
                <label id="lbl_rndTripTo" aria-label="To">
                  First Name*
                </label>
                <input
                  name="firstName"
                  type="text"
                  id="rndTripTo"
                  className="form-control"
                  placeholder="John"
                  style={{
                    width: "100%",
                    border: !valid.firstName ? "1px solid red" : "",
                  }}
                  onFocus={focusHandler}
                  data-select2-id="rndTripTo"
                  value={userInfo?.firstName}
                  onChange={changeHandler}
                />
              </div>

              <div className="field">
                <label id="lbl_rndTripTo" aria-label="To">
                  Last Name*
                </label>
                <input
                  name="lastName"
                  type="text"
                  id="rndTripTo"
                  className="form-control"
                  placeholder="Doe"
                  style={{
                    width: "100%",
                    border: !valid.lastName ? "1px solid red" : "",
                  }}
                  onFocus={focusHandler}
                  value={userInfo?.lastName}
                  onChange={changeHandler}
                />
              </div>
              <div className="field date-field">
                <label id="lbl_rndTripDates" aria-label="Date">
                  Date of Birth*
                </label>
                <div className="date-field-wrapper date-depart">
                  <input
                    name="dob"
                    type="date"
                    className="form-control"
                    placeholder="mm-dd-yyyy"
                    style={{
                      width: "100%",
                      border: !valid.dob ? "1px solid red" : "",
                    }}
                    onFocus={focusHandler}
                    value={userInfo?.dob}
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="fieldset half">
              <div className="field phone-field">
                <label id="lbl_rndTripPromoCode" aria-label="Promo Code">
                  Phone number
                </label>
                <div className="phone-input">
                  <Form.Control
                    as="select"
                    name="countryCode"
                    placeholder="Select country code"
                    value={selectedCountryCode}
                    onChange={e => setSelectedCountryCode(e.target.value)}
                  >
                    <option value="">Select Country Code</option>
                    {countryCodes.map((country, index) => (
                      <option key={index} value={country.code}>
                        {`${country.name} (${country.code})`}
                      </option>
                    ))}
                  </Form.Control>
                  <input
                    name="phoneNo"
                    type="tel"
                    id="rndTripPromoCode"
                    className="form-control"
                    placeholder="712 345 678"
                    value={userInfo?.phoneNo}
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <div className="field">
                <label id="lbl_rndTripPromoCode" aria-label="Promo Code">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  id="rndTripPromoCode"
                  placeholder="eg. johndoe@gmail.com"
                  className="form-control"
                  value={userInfo?.email}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {tab === "addPassenger" && +pendingBooking.passengers !== bookingUserInfo.length ? (
                <>
                  <button
                    type="submit"
                    name="btn-primary"
                    value="Next"
                    style={{ marginRight: "1rem" }}
                    id="round_trip_btn"
                    className="btn-primary btn-submit-form btn-rnd-trip"
                    onClick={addHandler}
                  >
                    Add
                  </button>
                  {action && (
                    <button
                      type="submit"
                      name="btn-primary"
                      value="Next"
                      id="round_trip_btn"
                      className="btn-primary btn-submit-form btn-rnd-trip"
                      onClick={Edithandler}
                    >
                      Submit
                    </button>
                  )}
                </>
              ) : (
                <button
                  type="submit"
                  name="btn-primary"
                  value="Next"
                  id="round_trip_btn"
                  className="btn-primary btn-submit-form btn-rnd-trip"
                  onClick={handlerSubmit}
                >
                  Next
                </button>
              )}
            </div>

            <span className="required-note">All fields with * are mandatory</span>
            <div className="general-error" id="oneWayErr">
              <p></p>
            </div>
          </div>
        </div>
      </div>
      {tab === "addPassenger" && (
        /*(bookingUserInfo.length > 1 || passengerBookings?.passengersInfo.length > 1) &&*/ <div className="table">
          <table>
            <thead>
              <tr>
                <th>firstName</th>
                <th>lastName</th>
                <th>date of Birth</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {action
                ? passengerBookings &&
                  [...passengerBookings?.passengersInfo].map((passenger, index) => {
                    const fName = passenger.fullName.split(" ")[0];
                    const lName = passenger.fullName.split(" ")[1];
                    return (
                      <tr key={index.toString()}>
                        <td>{fName}</td>
                        <td>${lName}</td>
                        <td>{passenger.dob}</td>
                        <td class="options-cell" style={{ position: "relative", padding: "1rem 0rem" }}>
                          <span class="vertical-dots" style={{ cursor: "pointer", fontSize: "18px" }} onclick={() => {}}>
                            &#8942;
                          </span>
                          <div
                            style={{
                              position: "absolute",
                              top: "auto",
                              zIndex: "9999",
                              backgroundColor: "#fff",
                              border: "1px solid #ccc",
                              display: "flex",
                              flexDirection: "column",
                              padding: "0.5rem",
                            }}
                          >
                            <FaTrash
                              color="red"
                              style={{ cursor: "pointer", margin: "0.3rem 0rem" }}
                              onClick={() => {
                                const delPassenger = [...passengerBookings?.passengersInfo].filter(p => p.email !== passenger.email);
                                setPassengersBookings(prev => {
                                  return { ...prev, passengersInfo: delPassenger };
                                });
                              }}
                            />
                            <Pencil
                              color="#0d6efd"
                              style={{ cursor: "pointer", margin: "0.3rem 0rem" }}
                              onClick={() => {
                                setUserInfo({
                                  dob: passenger.dob,
                                  firstName: fName,
                                  lastName: lName,
                                  email: passenger.email,
                                  phoneNo: passenger.phoneNo,
                                });
                                if (targetDivRef.current) targetDivRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : [...bookingUserInfo].splice(1, bookingUserInfo.length - 1).map((passenger, index) => {
                    return (
                      <tr key={index.toString()}>
                        <td>{passenger.firstName}</td>
                        <td>${passenger.lastName}</td>
                        <td>{passenger.dob}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
