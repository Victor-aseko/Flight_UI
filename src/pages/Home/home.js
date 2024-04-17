import React from "react";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import SearchForm from "../../container/search-form/search-form";
import image from "../../img/homepage.jpg";
import "./style.css";

export const Home = () => {
  return (
    <div className="App">
      <Header />
      <section
        className="Main-container"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexGrow: " 1",
          paddingTop: "30px",
          backgroundColor: "#fafafb",
        }}
      >
        <aside className="Search-section">
          <div className="search-flight">
            <p style={{ textAlign: "left", marginLeft: "8rem",fontSize: "25px" }}>Search Flight</p>
          </div>
          <SearchForm />
        </aside>
      </section>
      <Footer/>
    </div>
  );
};
