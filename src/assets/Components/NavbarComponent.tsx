import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export const NavbarComponent = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  if (!context) return null;
  const { currentUser } = context;

  function signOut() {
    localStorage.removeItem("CurrentUser");
    navigate("/");
  }
  return (
    <header>
      <Navbar expand="lg" className="fixed-top">
        <Container>
          <Navbar.Brand href="/dashboard">Dream Fest</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" role="navigation">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink to="/festivalcompare" className="nav-link">
                Festival Compare
              </NavLink>
              <NavLink to="/events" className="nav-link">
                {currentUser?.userName}
              </NavLink>

              <NavLink to="/" onClick={signOut} className="nav-link">
                Sign out
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavbarComponent;
