import { Card, Container } from "react-bootstrap";
import NavbarComponent from "../Components/NavbarComponent";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

export const DashBoard = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  if (!context) return null;
  const { currentUser } = context;
  return (
    <>
      <NavbarComponent />
      <section id="DashBoard">
        <Container>
          <div className="intro">
            <h1>Welcome Back, {currentUser?.userName}</h1>
            <p>
              Ready to start building your next festival experience? <br />{" "}
              Create a new event or continue from your saved festivals to
              simulate, manage, and explore your ideas.
            </p>
            <button
              onClick={() => {
                navigate("/createFestival");
              }}
            >
              {" "}
              Create Festival
            </button>
          </div>
          <div className="allEvents">
            <Card></Card>
          </div>
        </Container>
      </section>
    </>
  );
};
