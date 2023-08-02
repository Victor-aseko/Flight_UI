import React, { useLayoutEffect } from "react";
import { Header } from "../../components/header/header";
import { useState } from "react";
import "./style.css";
import countryCodes from "../../PHONEDATA.json";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";

export const Application = () => {
  const location = useLocation();
  const nav = useNavigate();
  const state = location.state;
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [userInfo, setUserInfo] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    dob: "",
    phoneNo: "",
    email: "",
    role: "",
    availableDate: "",
  });
  const [snackBar, setSnackBar] = useState(false);
  const [job, setJob] = useState("");

  useLayoutEffect(() => {
    if (state) {
      setJob(state.job);
      setUserInfo(prev => {
        return { ...prev, role: state.job.title };
      });
    } else {
      nav("/Jobs");
    }
  }, [nav, state]);

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch(`https://flight-booking-server-3zln.vercel.app/flight/create-application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObj(userInfo, job._id)),
    });
    if (res.ok) {
      setSnackBar(true);
      setTimeout(() => {
        nav("/Apply");
      }, 3000);
    }
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

  return (
    <div className="App">
      <Header />
      <div class="container">
        <div class="apply_box">
          <h1>Job Application Form</h1>
          <form action="">
            <div class="form_container">
              <div class="form_field">
                <label for="first_name"> First Name </label>
                <input id="first_name" name="firstName" className="form-control" placeholder="John" onChange={changeHandler} />
              </div>
              <div class="form_field">
                <label for="last_name"> Last Name </label>
                <input id="last_name" name="lastName" className="form-control" placeholder="Doe" onChange={changeHandler} />
              </div>

              <div className="form_field">
                <label for="DateOfBirth"> Date of Birth</label>
                <input name="dob" type="date" className="form-control" placeholder="mm-dd-yyyy" onChange={changeHandler} />
              </div>

              <div class="form_field">
                <label>Phone number</label>
                <div className="field phone-field">
                  <div className="phone-input">
                    <Form.Control
                      as="select"
                      name="countryCode"
                      placeholder="Select country code"
                      value={selectedCountryCode}
                      onChange={e => setSelectedCountryCode(e.target.value)}
                    >
                      <option value="">Country Code</option>
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
                      value={userInfo?.phoneNumber}
                      onChange={changeHandler}
                    />
                  </div>
                </div>
              </div>
              <div class="textarea_control">
                <label for="email"> Email </label>
                <input type="email" id="email" name="email" className="form-control" placeholder="johndoe@example.com" onChange={changeHandler} />
              </div>

              <div class="form_field">
                <label for="city"> City </label>
                <input id="city" className="form-control" name="city" placeholder="Nairobi" onChange={changeHandler} />
              </div>

              <div class="form_field">
                <label for="address"> Address </label>
                <input id="address" name="address" className="form-control" placeholder="11111" onChange={changeHandler} />
              </div>

              <div class="form_field">
                <label for="date"> Available start Date </label>
                <input name="availableDate" type="date" className="form-control" placeholder="mm-dd-yyyy" onChange={changeHandler} />
              </div>
            </div>
            <div class="button_container">
              {!snackBar ? (
                <button className="btn-submit" type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              ) : (
                <p>Your application will be reviewed shortly and a reponse sent to you</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const jsonObj = (userInfo, id) => {
  return {
    id,
    fullName: userInfo.firstName + " " + userInfo.lastName,
    dob: userInfo.dob,
    phoneNo: userInfo.phoneNo,
    email: userInfo.email,
    address: userInfo.address,
    role: userInfo.role,
    availableDate: userInfo.role,
  };
};
