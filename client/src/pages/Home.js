import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HomeBanner from "../assets/home.jpg";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Info from "../components/Layout/Info";
import useUser from "../hooks/useUser";
import "./style.css";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
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
              {user?._id && (
                <Button variant="plain" className="auth-btn text-white mt-4" onClick={() => navigate("/map")}>
                  View Map
                </Button>
              )}
            </div>
          </div>
          <Info />
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Home;
