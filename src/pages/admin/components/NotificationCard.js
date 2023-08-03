import React from "react";
import { Link } from "react-router-dom";

export const NotificationCard = ({ notification }) => {
  return (
    <li>
      <Link className="nav-link d-flex align-items-center">
        <div className="me-4">
          <div className="position-relative d-inline-block text-white">
            <span className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
          </div>
        </div>
        <div>
          <span className="d-block text-sm font-semibold">{notification.fullName}</span>
          <span className="d-block text-xs text-muted font-regular">
            {notification === "edit" ? "Delete booking reqeust" : "Edit Booking request"}
          </span>
        </div>
        <div className="ms-auto">
          <i className="bi bi-chat"></i>
        </div>
      </Link>
    </li>
  );
};
