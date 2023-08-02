import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/style.css";
import { authActions } from "../../store/authSlice";
import logo from "../../img/logo.png";
import { bookingActions } from "../../store/bookingSlice";

export const Header = () => {
  const user = useSelector(state => state.authReducer.user);

  const navigation = useNavigate();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(bookingActions.clear());
    dispatch(authActions.logout());
    navigation("/");
  };

  return (
    <header className="animate-search">
      <section id="bottom-section">
        <div className="logo">
          <img src={logo} style={{ position: "absolute", top: "0", left: "0", marginLeft: "20px" }} />
        </div>
        {/* #1d94f7 */}
        {user ? (
          <div className="col right">
            <span id="ctl00_ctBody_Web_Content_Home_Web_Header_Web_Menu_Web_menu">
              <nav id="main_nav">
                <ul>
                  <li className="current-menu-item">
                    <Link style={{ textDecoration: "none" }} to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li className="current-menu-item">
                    <Link style={{ textDecoration: "none" }} to={"/Bookings"}>
                      Bookings
                    </Link>
                  </li>
                  <li className="has-children">
                    <Link style={{ textDecoration: "none" }} to={"/Jobs"}>
                      Jobs
                    </Link>
                  </li>
                  {user.level === "admin" && (
                    <li className="has-children">
                      <Link style={{ textDecoration: "none" }} to={"/Admin"}>
                        Admin
                      </Link>
                    </li>
                  )}

                  <li className="has-children" onClick={logoutHandler}>
                    <Link>logout</Link>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: "1.2rem 0rem",
            }}
          >
            <Button onClick={() => navigation("/Login")} style={{ margin: "0rem .8rem" }}>
              Login
            </Button>
            <Button onClick={() => navigation("/SignUp")} style={{ margin: "0rem .8rem" }}>
              Register
            </Button>
          </div>
        )}
      </section>
    </header>
  );
};
