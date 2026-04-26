import { Card, Container, Row } from "react-bootstrap";
import NavbarComponent from "../Components/NavbarComponent";
import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

export const DashBoard = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  if (!context) return null;
  const { currentUser, all_fest } = context;
  useEffect(() => {
    if (!all_fest) {
    }
  }, []);
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
                navigate("/createfestival");
              }}
            >
              Create Festival
            </button>
          </div>
          <div className="allEvents">
            <Row>
              {all_fest
                .filter((f) => f.email === currentUser?.email)
                .map((f) => {
                  const dateObj = new Date(f.start_Date);

                  const month = dateObj.toLocaleDateString("en-GB", {
                    month: "short",
                  });

                  const day = dateObj.toLocaleDateString("en-GB", {
                    day: "numeric",
                  });

                  return (
                    <div className="col-lg-4 col-md-6 col-sm-12 eventCol">
                      <p className="E_month">{month} </p>
                      <p className="E_month">{day} </p>
                      <h3>{f.festival_Name}</h3>
                      <p className="p1">Duration : {f.duration} (Days)</p>
                      <p className="p1">
                        Expected Audience: {f.expected_audience}
                      </p>
                    </div>
                  );
                })}
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};
