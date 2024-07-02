import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./employeeMatching.css";
import { useRef } from "react";

export const EmployeeMatching = ({ employeeMatch }) => {
  const [applicants, setApplicants] = useState([]);

  const successRef = useRef();

  useEffect(() => {
    setApplicants(employeeMatch);
  }, [employeeMatch]);

  const changeStatusEmployeee = async (application, action) => {
    const res = await fetch(`https://flight-booking-server-sand.vercel.app/flight/update-application`, {
      method: "POST",
      body: JSON.stringify({ id: application._id, status: action }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      if (action === "success") {
        setApplicants(prev => {
          return prev.map(p => {
            if (p._id === application._id) return { ...p, status: "success" };
            return p;
          });
        });
      } else
        setApplicants(prev => {
          return prev.filter(p => p._id !== application._id);
        });
    }
    const data = await res.json();
    console.log("==========================RESPONSE DATA====================");
    console.log(data);
  };

  console.log(applicants);

  const printMatches = useReactToPrint({
    content: () => successRef.current,
  });

  return (
    <>
      <main className="py-6 bg-surface-secondary">
        <div className="container-fluid">
          <h2 className="title">pending Applicantions</h2>
          <div className="table-responsive">
            <table className="table table-hover table-nowrap">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">email</th>
                  <th scope="col">Phone no.</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th></th>
                </tr>
              </thead>
              {applicants?.map(b => {
                if (b.status === "pending") return <tbody>{TableRow(b, changeStatusEmployeee)}</tbody>;
              })}
            </table>
          </div>
        </div>
        <div className="container-fluid my-2" ref={successRef}>
          <h2 className="title">success Applicantions</h2>
          <div className="table-responsive">
            <table className="table table-hover table-nowrap">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">email</th>
                  <th scope="col">Phone no.</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th></th>
                </tr>
              </thead>
              {applicants?.map(b => {
                if (b.status === "success") return <tbody>{TableRow(b, changeStatusEmployeee)}</tbody>;
              })}
            </table>
          </div>
        </div>
      </main>

      {!!applicants?.find(p => p.status === "success") && (
        <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0rem" }}>
          <button type="button" style={{ borderRadius: ".8rem" }} onClick={printMatches}>
            Print success matches
          </button>
        </div>
      )}
    </>
    // </div>
  );
};

export const TableRow = (b, deleteBooking) => {
  return (
    <tr>
      <td>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="text-heading font-semibold" href="#">
          {b?.fullName}
        </a>
      </td>
      <td>{b?.email}</td>
      <td>
        <p className="text-heading font-semibold">{b?.phoneNo}</p>
      </td>
      <td>{b?.role}</td>
      <td>
        <span className="badge badge-lg badge-dot">
          <i className="bg-success"></i>
          {b.status}
        </span>
      </td>
      <td className="text-end row">
        {b.status === "pending" ? (
          <>
            <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover" onClick={() => deleteBooking(b, "success")}>
              <i className="bi bi-check2"></i>
            </button>
            <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover" onClick={() => deleteBooking(b, "reject")}>
              <i className="bi bi-x"></i>
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover" onClick={() => deleteBooking(b, "delete")}>
            <i className="bi bi-trash"></i>
          </button>
        )}
      </td>
    </tr>
  );
};
