import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { Inquiries } from "./components/Inquiries";
import Sidebar from "./components/Sidebar";
import { EmployeeMatching } from "./components/employeeMatching";
import "./home.css";

export function Admin() {
  const user = useSelector(state => state.authReducer.user);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [employeeMatch, setEmployeeMatch] = useState([]);
  const [notification, setNotification] = useState([]);
  //EmployeeMatching inquiries'
  const nav = useNavigate();
  useEffect(() => {
    if (user.level !== "admin") {
      nav("/");
    }
  }, [nav, user.level]);

  return (
    <div className="App">
      <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
        <Sidebar setActiveTab={setActiveTab} notification={notification} />
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">{getView(activeTab, setEmployeeMatch, employeeMatch, setNotification)}</div>
      </div>
    </div>
  );
}

const getView = (tab, setEmployeeMatch, employeeMatch, setNotification) => {
  if (tab === "dashboard") return <Dashboard setEmployeeMatch={setEmployeeMatch} setNotification={setNotification} />;
  else if (tab === "employeeMatching") return <EmployeeMatching employeeMatch={employeeMatch} />;
  else return <Inquiries />;
};
