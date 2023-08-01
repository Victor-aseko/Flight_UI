import React from "react";
import { Header } from "../../components/header/header";
import { useState } from "react";
import "./style.css";
import countryCodes from "../../PHONEDATA.json";
import Form from "react-bootstrap/Form";

export const Application = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileIsValid, setFileIsValid] = useState(true);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");

  const [userInfo, setUserInfo] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    DOB: "",
    number: "",
    email: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileIsValid(validateFile(file));
  };

  // Validation function for allowed file extensions
  const validateFile = (file) => {
    if (!file) {
      return true; // No file selected, consider as valid
    }

    const allowedExtensions = ["pdf", "docx"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    return allowedExtensions.includes(fileExtension);
  };

  const handleSubmit = () => {
    if (fileIsValid && selectedFile) {
      setSubmissionSuccess(true);
    }
  };

  const changeHandler = (e) => {
    const { value, name } = e.target;

    if (name === "countryCode") {
      setSelectedCountryCode(value);
    } else {
      setUserInfo((prev) => {
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
                <input
                  id="first_name"
                  name="first_name"
                  className="form-control"
                  placeholder="John"
                />
              </div>
              <div class="form_field">
                <label for="last_name"> Last Name </label>
                <input
                  id="last_name"
                  name="last_name"
                  className="form-control"
                  placeholder="Doe"
                />
              </div>

              <div className="form_field">
                <label for="DateOfBirth"> Date of Birth</label>
                <input
                  name="DateOfBirth"
                  type="date"
                  className="form-control"
                  placeholder="mm-dd-yyyy"
                />
              </div>

              <div class="form_field">
              <label >
                    Phone number
                  </label>
                <div className="field phone-field">
                  <div className="phone-input">
                    <Form.Control
                      as="select"
                      name="countryCode"
                      placeholder="Select country code"
                      value={selectedCountryCode}
                      onChange={(e) => setSelectedCountryCode(e.target.value)}
                    >
                      <option value="">Country Code</option>
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {`${country.name} (${country.code})`}
                        </option>
                      ))}
                    </Form.Control>
                    <input
                      name="phoneNumber"
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
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="johndoe@example.com"
                />
              </div>

              <div class="form_field">
                <label for="city"> City </label>
                <input
                  id="city"
                  className="form-control"
                  name="city"
                  placeholder="Nairobi"
                />
              </div>

              <div class="form_field">
                <label for="address"> Address </label>
                <input
                  id="address"
                  name="address"
                  className="form-control"
                  placeholder="11111"
                />
              </div>

              <div class="form_field">
                <label for="job_role"> Job Role </label>
                <select id="job_role" name="job_role">
                  <option value="">Flight attendant</option>
                  <option value="">Baggage handler</option>
                  <option value="">Passenger assistant</option>
                  <option value="">Airline Clearance agent</option>
                  <option value="">Pilot</option>
                  <option value="">Airline Caterers</option>
                  <option value="">Avionics technician</option>
                  <option value="">Air traffic controller</option>
                  <option value="">Customer service agent</option>
                </select>
              </div>

              <div class="form_field">
                <label for="date"> Available start Date </label>
                <input
                  name="DateOfBirth"
                  type="date"
                  className="form-control"
                  placeholder="mm-dd-yyyy"
                />
              </div>
              <div class="form_field">
                <label for="upload"> Upload your resume/CV* </label>
                {/* <div className="resume"> */}
                <input
                  type="file"
                  id="upload"
                  name="upload"
                  onChange={handleFileChange}
                />

                {!fileIsValid && (
                  <div>
                    {/* Invalid file message */}
                    <p>Please upload a valid PDF or DOCX file.</p>
                  </div>
                )}
                {/* </div> */}
              </div>
            </div>
            <div class="button_container">
              <button className="btn-submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
     
    </div>
  );
};
