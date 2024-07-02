import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./search-form.css";
import { useDispatch } from "react-redux";
import { bookingActions } from "../../store/bookingSlice";
import jsonData from "../../MOCK_DATA.json";

export const SearchForm = props => {
  const [isReturn, setFlightType] = useState(false);
  const [airPorts, setAirports] = useState({ origin: [], destination: [] });
  const [searchResult, setSearchResult] = useState([]);
  const [showTimetable, setShowTimetable] = useState(false);
  const [form, setForm] = useState({ origin: "", destination: "", passengers: 1, departureTime: "", class: "Executive" });
  const [validation, setValidation] = useState({ origin: true, destination: true, passengers: true, departureTime: true, class: true });

  const [msg, setMsg] = useState("");
  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      setAirports(fetchAirports());
    })();
  }, []);

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      const validationStatus = {
        origin: !!form.origin,
        destination: !!form.destination,
        passengers: !!form.passengers,
        departureTime: !!form.departureTime,
        class: !!form.class,
      };
      // Update the validation state
      setValidation(validationStatus);
      // Check if all required fields are filled out
      const isValidForm = Object.values(validationStatus).every(isValid => isValid);
      if (!isValidForm) return;

      setMsg("");
      setSearchResult([]);
      const res = await fetch("https://flight-booking-server-sand.vercel.app/flight/search", {
        method: "POST",
        body: JSON.stringify({ destination: form.destination, departureTime: form.departureTime, origin: form.origin, passengers: form.passengers }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data.flights) {
        setSearchResult(data.flights);

        return setShowTimetable(true);
      } else {
        setMsg(data.message);
      }
    } catch (error) {
      setMsg("no flights found");
      console.log("==================================FETCH DATA ERROR==================================");
      console.log(error);
    }
  };

  const handleButtonClick = flight => {
    // Perform actions when the button is clicked for a specific flight
    dispatch(bookingActions.clearBooking());
    dispatch(
      bookingActions.createPendingBooking({
        ...flight,
        passengers: form.passengers,
        class: form.class,
        fare: flight.price[form.class.toLowerCase()] ? flight.price[form.class.toLowerCase()] : flight.price.low,
      })
    );
    navigation("/Booking");
  };

  const focusHandler = () => {
    setValidation({ origin: true, destination: true, passengers: true, departureTime: true, class: true });
    setShowTimetable(false);
    setSearchResult([]);
    setMsg("");
  };

  return (
    <div className="flight-search-container">
      <div className="flight-search-card">
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="flight-type-ctn">
            <div className="flight-type-group">
              <Form.Check
                inline
                checked={!isReturn}
                type="radio"
                label="One way"
                name="flightType"
                id="formHorizontalRadios1"
                onChange={e => setFlightType(false)}
                onFocus={focusHandler}
              />
            </div>
            <div className="flight-type-group">
              <Form.Group className="flight-type-group">
                <Form.Check
                  inline
                  checked={isReturn}
                  type="radio"
                  label="Round Trip"
                  name="flightType"
                  id="formHorizontalRadios2"
                  onChange={e => setFlightType(true)}
                  onFocus={focusHandler}
                />
              </Form.Group>
            </div>
          </div>
          <div className="input-form">
            <div className="form-group">
              <label htmlFor="from">From</label>
              <Typeahead
                labelKey="origin"
                options={airPorts.origin}
                id="origin"
                placeholder="Select Origin"
                style={!validation.origin ? { border: "1px solid red" } : {}}
                onChange={e =>
                  setForm(prev => {
                    return { ...prev, origin: e[0] };
                  })
                }
                onFocus={focusHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="to">To</label>
              <Typeahead
                labelKey="destination"
                options={airPorts.destination}
                id="destination"
                placeholder="Select Destination"
                style={!validation.destination ? { border: "1px solid red" } : {}}
                onChange={e =>
                  setForm(prev => {
                    return { ...prev, destination: e[0] };
                  })
                }
                onFocus={focusHandler}
              />
            </div>

            <div className="form-group">
              <label>Departure Date</label>
              <Form.Control
                type="date"
                name="dateOfDep"
                placeholder="yyyy-mm-dd"
                required={true}
                style={!validation.departureTime ? { border: "1px solid red" } : {}}
                onChange={e =>
                  setForm(prev => {
                    return { ...prev, departureTime: new Date(e.target.value) };
                  })
                }
                onFocus={focusHandler}
              />
            </div>

            {isReturn && (
              <div className="form-group">
                <label>Return Date</label>
                <Form.Control type="date" name="dateOfReturn" placeholder="yyyy-mm-dd" />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="departure">Class</label>
              <Form.Control
                as="select"
                name="class"
                placeholder="class"
                style={!validation.class ? { border: "1px solid red" } : { padding: "0px 10px" }}
                onChange={e =>
                  setForm(prev => {
                    return { ...prev, class: e.target.value };
                  })
                }
              >
                <option>Executive</option>
                <option>Middle</option>
                <option>Economy</option>
              </Form.Control>
            </div>
            <div className="form-group">
              <label htmlFor="departure">Passengers</label>
              <Form.Control
                as="select"
                name="numOfPassengers"
                placeholder="Number of Passengers"
                style={!validation.passengers ? { border: "1px solid red" } : { padding: "0px 10px" }}
                onChange={e =>
                  setForm(prev => {
                    return { ...prev, passengers: e.target.value };
                  })
                }
                onFocus={focusHandler}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </div>
          </div>
          <div className="button-container">
            <button type="submit">Search</button>
          </div>
          <div style={{ color: "red", textAlign: "center", fontSize: "large" }}>{msg}</div>
        </form>
        {showTimetable && (
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th style={{ color: "white" }}>Flight Name</th>
                  <th style={{ color: "white" }}>Departure Time</th>
                  <th style={{ color: "white" }}>Arrival Time</th>
                  <th style={{ color: "white" }}>Fare</th>
                  <th style={{ color: "white" }}>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {searchResult.map((flight, index) => {
                  const match = new Date(flight.departureTime).toLocaleDateString() === new Date(form.departureTime).toLocaleDateString();
                  const price = flight.price[form.class.toLowerCase()] ? flight.price[form.class.toLowerCase()] : flight.price.low;
                  const time = new Date(new Date(flight.departureTime).getTime() + +flight.flightTime * 60 * 60 * 1000);
                  return (
                    <tr key={index.toString()}>
                      <td>{flight.flightName}</td>
                      <td>{DateTime(flight.departureTime)}</td>
                      <td>{DateTime(time)}</td>
                      <td>${price}</td>
                      <td style={{ color: match ? "green" : "orange" }}>{match ? "Match!" : "Recommended"}</td>
                      <td>
                        <button onClick={() => handleButtonClick(flight)}>Book</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;

export const DateTime = time => {
  return `${new Date(time).toLocaleDateString()} 
                        ${new Date(time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}`;
};

const fetchAirports = () => {
  const origin = new Set();
  const destination = new Set();

  jsonData.forEach(flight => {
    origin.add(flight.origin);
    destination.add(flight.destination);
  });
  return { origin: [...origin], destination: [...destination] };
};
