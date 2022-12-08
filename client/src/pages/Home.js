import React from "react";
import { Container } from "react-bootstrap";
import HomeBanner from "../assets/home.jpg";
import "./style.css";

const Home = () => {
  return (
    <Container>
      <div className="row">
        <img src={HomeBanner} alt="" className="my-5 py-md-5 col-md-6" />
        <div className="col-md-6 text-center align-self-center">
          <h1 className="banner-text fw-bold fst-italic">
            Pin Your Trip <br /> With Us.
          </h1>
        </div>
      </div>
    </Container>
  );
};

export default Home;
