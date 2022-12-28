import axios from "axios";
import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import useUser from "../../hooks/useUser";
import "./style.css";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleClick = async () => {
    try {
      const res = await axios.get("/logout");
      if (res.data.success) {
        setUser({});
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg" variant="light">
      <Container>
        <img src={Logo} alt="Logo" height={100} width={100} />

        {user?._id ? (
          <div className="d-flex align-items-center">
            <h5 className="mb-0 me-4 user">Hello, {user.username}</h5>
            <Button variant="plain" className="auth-btn text-white mx-1" onClick={() => handleClick()}>
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Button variant="plain" className="auth-btn text-white mx-1" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="plain" className="auth-btn text-white mx-1" onClick={() => navigate("/register")}>
              Register
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
