import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import "./style.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" variant="light">
      <Container>
        <img src={Logo} alt="Logo" height={100} width={100} />
        <div>
          <Button variant="plain" className="auth-btn text-white mx-1" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button variant="plain" className="auth-btn text-white mx-1" onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
