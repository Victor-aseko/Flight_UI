import React, { useLayoutEffect, useRef, useState } from "react";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { PersonlInfo } from "../../components/Forms/person-info";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import "../../styles/style.css";

export const EditBooking = () => {
  const location = useLocation();
  const nav = useNavigate();
  const bookingState = location.state;
  const [booking, setBooking] = useState();
  const [selectedTab, setSelectedTab] = useState("psnlInfo");
  const psnlInfoRef = useRef(null);
  const seatSelectRef = useRef(null);

  useLayoutEffect(() => {
    if (bookingState) setBooking(bookingState.booking);
    else nav("/Bookings");
  }, []);

  const scrollToSection = (ref, tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <div className="App">
      <Header />
      <section className="content-wrapper dark">
        <h3>Edit Your Information</h3>
        <div className="wrapper">
          <div className="booking-widget">
            <div className="bookingtabs" role="tablist">
              <a
                href="#psnlInfo"
                onClick={() => scrollToSection(psnlInfoRef, "psnlInfo")}
                className={selectedTab === "psnlInfo" ? "active  fa fa-user" : "fa fa-user"}
                role="tab"
                aria-controls="psnlInfo"
                aria-selected={selectedTab === "psnlInfo"}
              >
                <span>
                  <FaUser className="user-icon" /> Personal info
                </span>
              </a>
              <a
                href="#addPassenger"
                onClick={() => scrollToSection(seatSelectRef, "addPassenger")}
                className={selectedTab === "addPassenger" ? "active icon-check-in" : "icon-check-in"}
                role="tab"
                aria-controls="addPassenger"
                aria-selected={selectedTab === "addPassenger"}
              >
                <span>
                  <FaUserPlus className="user-icon" />
                  Add Passenger
                </span>
              </a>
            </div>
            {activeTab(setSelectedTab, selectedTab, booking)}
            <span id="ctl00_ctBody_Web_Content_Home_BookingEngine_ManageMyBooking_ekapi_language"></span>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const activeTab = (setSelectedTab, tab, booking) => {
  return <PersonlInfo setSelectedTab={setSelectedTab} tab={tab} action={"edit"} booking={booking} />;
};
