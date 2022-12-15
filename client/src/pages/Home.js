import React from "react";
import { Container } from "react-bootstrap";
import HomeBanner from "../assets/home.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./style.css";

const Home = () => {
  return (
    <>
      <div className="main">
        <Header />
        <Container>
          <div className="row">
            <div className="my-5 col-md-6">
              <img src={HomeBanner} alt="Home-Banner" className="ms-md-4 rounded-4 w-100 banner-img" />
            </div>
            <div className="col-md-6 text-center align-self-center">
              <h1 className="banner-text fw-bold fst-italic">
                Pin Your Trip <br /> With Us.
              </h1>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Home;
