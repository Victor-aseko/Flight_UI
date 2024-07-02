import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/header/header";

import "./style.css";
const images = [
  "https://www.pexels.com/photo/photo-of-airplane-1928068/",
  "https://www.pexels.com/photo/airport-workers-in-reflective-vests-standing-next-to-an-airplane-15923439/",
  "https://www.pexels.com/photo/person-holding-gray-twist-pen-and-white-printer-paper-on-brown-wooden-table-955389/",
  "https://www.pexels.com/photo/pilots-operating-airplane-in-cockpit-during-flight-4269510/",
  "https://www.pexels.com/photo/aircraft-2059627/",
  "https://www.pexels.com/photo/unrecognizable-airport-workers-directing-helicopter-during-arrival-4490704/",
  "https://www.pexels.com/photo/man-having-a-phone-call-in-front-of-a-laptop-859264/",
  "https://www.pexels.com/photo/flight-attendants-wearing-face-mask-while-standing-on-the-aisle-of-an-airplane-12870864//",
  "https://www.pexels.com/photo/a-flight-attendant-standing-in-the-cabin-11989307/",
];

export const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await fetch("https://flight-booking-server-sand.vercel.app/flight/jobs", {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setJobs(data.jobs);
    })();
  }, []);

  return (
    <>
      <div className="App">
        <Header />
        <div className="job">
          <div className="job-wrapper">
            <div className="main-container">
              <div className="search-type">
                <div className="job-time">
                  <div className="job-time-title">Type of Employment</div>
                  <div className="job-wrapper">
                    <div className="type-container">
                      <label for="job1">Full Time Jobs</label>
                      <span className="job-number">56</span>
                    </div>
                    <div className="type-container">
                      <label for="job2">Part Time Jobs</label>
                      <span className="job-number">43</span>
                    </div>
                    <div className="type-container">
                      <label for="job3">Remote Jobs</label>
                      <span className="job-number">24</span>
                    </div>
                    <div className="type-container">
                      <label for="job4">Internship Jobs</label>
                      <span className="job-number">27</span>
                    </div>
                    <div className="type-container">
                      <label for="job5">Contract</label>
                      <span className="job-number">76</span>
                    </div>
                    <div className="type-container">
                      <label for="job6">Training Jobs</label>
                      <span className="job-number">28</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="searched-jobs">
                <div className="job-cards">
                  {jobs.map((job, index) => (
                    <div className="job-card" key={job.id}>
                      <div className="job-card-header">
                        <img
                          src={"https://images.pexels.com/photos/1928068/pexels-photo-1928068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                          alt={job.title}
                        />
                      </div>
                      <div className="job-card-title">
                        <h3>{job.title}</h3>
                      </div>
                      <div className="job-card-subtitle">{job.subtitle}</div>
                      <div className="job-detail-buttons">
                        {job.details.map((detail, index) => (
                          <button className="search-buttons detail-button" key={index}>
                            {detail}
                          </button>
                        ))}
                      </div>
                      <div className="job-card-buttons">
                        <button
                          className="search-buttons card-buttons"
                          onClick={() => {
                            nav("/Apply", {
                              state: { job },
                            });
                          }}
                        >
                          Apply Now
                        </button>
                      </div>
                      {selectedJob === job.id && (
                        <div>
                          <h3>Requirements:</h3>
                          <p>{job.Requirements}</p>
                          <h3>Salary:</h3>
                          <p>{job.salary}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
