import { Container, Nav, Navbar, Offcanvas, Button } from "react-bootstrap";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/chatContext";
const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const { setUserInfo } = ChatState();

  useEffect(() => {
    localStorage.getItem("userInfo") && setIsLogin(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo({});
    setIsLogin(false);
    navigate("/login");
  };

  const handleClose = () => setShowOffcanvas(false);

  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="#">
            <img src={Logo} alt="logo" width={200} />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-lg`}
            onClick={() => setShowOffcanvas((prevState) => !prevState)}
          />
          <Navbar.Offcanvas
            show={showOffcanvas}
            onHide={handleClose}
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                <img src={Logo} alt="logo" width={150} />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className="justify-content-end align-items-start align-items-lg-center flex-grow-1 pe-3 gap-3"
                onClick={handleClose}
              >
                <Link to="/">Home</Link>
                <a href="../#about">About Us</a>
                <a href="../#service">Service</a>
                <Link to="/check">Check</Link>
                <Link to="/hospital">Hospitals</Link>
                <Link to="/doctor">Doctors</Link>
                <a href="../#contact">Contact</a>
                {!isLogin ? (
                  <Button onClick={() => navigate("/login")}>Login</Button>
                ) : (
                  <Button onClick={handleLogout}>Logout</Button>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
