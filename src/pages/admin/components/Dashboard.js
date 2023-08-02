import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Dashboard({ setEmployeeMatch }) {
  const { user } = useSelector(state => state.authReducer);
  const [cards, setCards] = useState([
    { title: "Earnings", icon: "bi bi-credit-card", color: "bg-tertiary", data: "" },
    { title: "Scheduled Flights", icon: "bi bi-credit-card", color: "bg-primary", data: "" },
    { title: "Flight Hours", icon: "bi bi-credit-card", color: "bg-info", data: "" },
    { title: "Employee matches", icon: "bi bi-credit-card", color: "bg-warning", data: "" },
  ]);
  const [summary, setSummary] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://flight-booking-server-3zln.vercel.app/flight/get-summary/${user.email}`);
      const data = await res.json();
      console.log("============================SUMMARY DATA==========================");
      console.log(data);
      if (data.summary) {
        setSummary(data.summary);
        setEmployeeMatch(data.summary.jobs);
        const summaryData = cards.map(c => {
          if (c.title === "Earnings") return { ...c, data: data.summary.payment };
          else if (c.title === "Scheduled Flights") return { ...c, data: data.summary.scheduledFlights };
          else if (c.title === "Flight Hours") return { ...c, data: data.summary.flightHours };
          else {
            return { ...c, data: data.summary.employeeMatch };
          }
        });
        setCards(summaryData);
      }
    })();
  }, []);

  const deleteBooking = async b => {
    const res = await fetch(`https://flight-booking-server-3zln.vercel.app/flight/delete`, {
      method: "POST",
      body: JSON.stringify({ id: b._id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setSummary(prev => {
        const booking = prev?.booking?.filter(s => s._id !== b._id);
        return { ...prev, booking };
      });
    }
    const data = await res.json();
    console.log("=============================delete reponse================================");
    console.log(data);
  };
  return (
    <>
      <header className="bg-surface-primary border-bottom pt-6">
        <div className="container-fluid">
          <div className="mb-npx">
            <div className="row align-items-center">
              <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                <h1 className="h2 mb-0 ls-tight">flight Summary</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="py-6 bg-surface-secondary">
        <div className="container-fluid">
          <div className="row g-6 mb-6">
            {cards.map(d => {
              return (
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">{d.title}</span>
                          <span className="h3 font-bold mb-0">{d.data ? d.data : 0}</span>
                        </div>
                        <div className="col-auto">
                          <div className={`icon icon-shape ${d.color} text-white text-lg rounded-circle`}>
                            <i className={d.icon}></i>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-success text-success me-2">
                          <i className="bi bi-arrow-up me-1"></i>13%
                        </span>
                        <span className="text-nowrap text-xs text-muted">Since last month</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card shadow border-0 mb-7">
            <div className="card-header">
              <h5 className="mb-0">Bookings</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-nowrap">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Flight Name</th>
                    <th scope="col">origin</th>
                    <th scope="col">destination</th>
                    <th scope="col">Status</th>
                    <th></th>
                  </tr>
                </thead>
                {summary?.booking?.map(b => {
                  return <tbody>{TableRow(b, deleteBooking)}</tbody>;
                })}
              </table>
            </div>
            <div className="card-footer border-0 py-5">
              {/* <span className="text-muted text-sm">Showing 10 items out of 250 results found</span> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Dashboard;
export const TableRow = (b, deleteBooking) => {
  return (
    <tr>
      <td>
        <img
          alt="..."
          src="https://icons-for-free.com/iconfiles/png/512/avatar+person+profile+user+icon-1320166578424287581.png"
          className="avatar avatar-sm rounded-circle me-2"
        />
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="text-heading font-semibold" href="#">
          {b?.fullName}
        </a>
      </td>
      <td>{b?.flight?.flightName}</td>
      <td>
        <p className="text-heading font-semibold">{b.flight?.origin}</p>
      </td>
      <td>{b?.flight?.destination}</td>
      <td>
        <span className="badge badge-lg badge-dot">
          <i className="bg-success"></i>Scheduled
        </span>
      </td>
      <td className="text-end">
        <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover" onClick={() => deleteBooking(b)}>
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
};
