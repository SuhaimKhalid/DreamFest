import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export const NavbarComponent = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { currentUser } = context;
  return (
    <header>
      <Navbar expand="lg" className="fixed-top">
        <Container>
          <Navbar.Brand href="/">Dream Fest</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" role="navigation">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink to="/events" className="nav-link">
                {currentUser?.userName}
              </NavLink>

              <NavLink to="/login" className="nav-link">
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
