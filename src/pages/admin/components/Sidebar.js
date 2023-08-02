import React from "react";
import { NotificationCard } from "./NotificationCard";
import { Link } from "react-router-dom";
import logo from "../../../img/logo.png";

function Sidebar({ setActiveTab }) {
  return (
    <nav
      className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
      id="navbarVertical"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler ms-n2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" to={"/"}>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className="navbar-user d-lg-none">
          <div className="dropdown">
            <a id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <div className="avatar-parent-child">
                <img
                  alt="Placeholder"
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                  className="avatar avatar- rounded-circle"
                />
                <span className="avatar-child avatar-badge bg-success"></span>
              </div>
            </a>

            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
              <Link className="dropdown-item" onClick={() => setActiveTab("dashboard")}>
                Dashboard
              </Link>
              <Link className="dropdown-item" onClick={() => setActiveTab("employeeMatching")}>
                EmployeeMatching
              </Link>
              <Link className="dropdown-item" onClick={() => setActiveTab("inquiries")}>
                Inquiries
              </Link>
              <hr className="dropdown-divider" />
            </div>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href="#" onClick={() => setActiveTab("dashboard")}>
                <i className="bi bi-house"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#" onClick={() => setActiveTab("employeeMatching")}>
                <i className="bi bi-bar-chart"></i> EmployeeMatching
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="#" onClick={() => setActiveTab("inquiries")}>
                <i className="bi bi-bookmarks"></i> Inquiries
              </Link>
            </li>
          </ul>

          <hr className="navbar-divider my-5 opacity-20" />

          <ul className="navbar-nav mb-md-4">
            <li>
              <div className="nav-link text-xs font-semibold text-uppercase text-muted ls-wide" href="#">
                Notifications
                <span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-4">13</span>
              </div>
            </li>
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </ul>
          <div className="mt-auto"></div>
        </div>
      </div>
    </nav>
  );
}
export default Sidebar;
