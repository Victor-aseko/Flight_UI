import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
// import "../Forms/bootstrap.min.css";

export const Footer = () => {
  return (
    <section id="footer" class="footer">
      <div className="footer-content">
        <div className="footer-container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-info">
                <h3>The Flyest Corp</h3>
                <p>
                  23356-80100<br></br>
                  Nairobi, KENYA<br></br>
                  <strong>Phone:</strong> +254 759 107 631<br></br>
                  <strong>Email:</strong> theflyestcorp@gmail.com<br></br>
                </p>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bi bi-chevron-right"></i>
                  <Link style={{ textDecoration: "none" }} to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>
                  <Link style={{ textDecoration: "none" }} to={"/Bookings"}>
                    Bookings
                  </Link>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>
                  <Link style={{ textDecoration: "none" }} to={"/Jobs"}>
                    Jobs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Information</h4>
              <ul>
                <li>
                  <i className="bi bi-chevron-right"></i>{" "}
                  <a href="https://www.termsfeed.com/blog/sample-terms-of-service-template/">Terms of service</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i> <a href="https://www.privacypolicies.com/blog/privacy-policy-template/">Privacy policy</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>Subscribe to our email newsletter to receive updates</p>
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-legal text-center">
        <div class="footer-legal-container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
          <div class="d-flex flex-column align-items-center align-items-lg-start">
            <div class="copyright">
              &copy; Copyright
              <strong>
                <span>The Flyest Corp</span>
              </strong>
              . All Rights Reserved
            </div>
            {/* <div class="credits">
              Designed by 
            </div> */}
          </div>

          <div class="social-links order-first order-lg-last mb-3 mb-lg-0">
            <a href="#" class="twitter">
              <i class="bi bi-twitter"></i>
            </a>
            <a href="#" class="facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="#" class="instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="#" class="google-plus">
              <i class="bi bi-skype"></i>
            </a>
            <a href="#" class="linkedin">
              <i class="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
