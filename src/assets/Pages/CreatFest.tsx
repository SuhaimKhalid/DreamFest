import { useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { Festival } from "../Utilities/Type";
import { AppContext } from "../Context/AppContext";

export const CreateFest = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { currentUser, all_fest, setAll_fest } = context;

  const navigate = useNavigate();
  //   Errors
  type createFestErrors = {
    festival_Name?: string;
    duration?: string;
    expected_audience?: string;
    start_Date?: string;
    ticket?: string;
  };
  const [errors, setErrors] = useState<createFestErrors>({});

  // Variables

  const [festival_Name, setFestival_Name] = useState("");
  const [duration, setDuration] = useState("");
  const [ticket, setTicket] = useState("");
  const [expected_audience, setExpected_audience] = useState("");
  const [start_Date, setStart_Date] = useState("");

  function CreateFest_Handler(e: React.FormEvent) {
    e.preventDefault();

    if (
      !festival_Name.trim() ||
      !duration.trim() ||
      !expected_audience.trim() ||
      !start_Date.trim() ||
      !ticket.trim()
    ) {
      setErrors({
        festival_Name: !festival_Name.trim()
          ? "Festival Name is required."
          : "",
        duration: !duration.trim() ? "Duration is required." : "",
        expected_audience: !expected_audience.trim()
          ? "Expected Audience Size is requried."
          : "",
        start_Date: !start_Date.trim() ? "Start Date is requried." : "",
        ticket: !ticket.trim() ? "Ticket is requried." : "",
      });
      return;
    }

    if (!currentUser) {
      return null;
    }

    const email = currentUser.email;

    const id = Date.now().toString();
    if (new Date(start_Date) < new Date()) {
      alert("Festival date cannot be in the past");
      return;
    }
    const new_fest: Festival = {
      id,
      email,
      ticket: Number(ticket),
      festival_Name,
      duration,
      expected_audience,
      start_Date,
    };

    const updated_Fest = [...all_fest, new_fest];

    setAll_fest(updated_Fest);

    console.log(new_fest);
    localStorage.setItem("Festivals", JSON.stringify(updated_Fest));

    setFestival_Name("");
    setDuration("");
    setExpected_audience("");
    setStart_Date("");
    setTicket("");
    alert("Festival is Created!");
    navigate("/dashboard");
  }
  return (
    <>
      <section id="CreateFestival">
        <Row>
          <Container>
            <div className="form_col">
              <h1>Create Festival</h1>
              <form onSubmit={CreateFest_Handler}>
                {/* Festival Name Input Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Festival Name
                  </label>
                  <input
                    value={festival_Name}
                    onChange={(e) => {
                      setFestival_Name(e.target.value);
                      setErrors((prev) => ({ ...prev, festival_Name: "" }));
                    }}
                    type="text"
                    className="form-control"
                    id="FestName"
                  />
                  {errors.festival_Name && (
                    <small className="text-danger">
                      {errors.festival_Name}
                    </small>
                  )}
                </div>
                {/* Start Date  Input Field */}
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Start Date
                  </label>
                  <input
                    value={start_Date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      setStart_Date(e.target.value);
                      setErrors((prev) => ({ ...prev, start_Date: "" }));
                    }}
                    type="date"
                    className="form-control"
                    id="date"
                  />
                  {errors.start_Date && (
                    <small className="text-danger">{errors.start_Date}</small>
                  )}
                </div>
                {/* Duration Input Field */}
                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">
                    Duration (Days)
                  </label>
                  <input
                    value={duration}
                    min="0"
                    onChange={(e) => {
                      setDuration(e.target.value);
                      setErrors((prev) => ({ ...prev, duration: "" }));
                    }}
                    type="number"
                    className="form-control"
                    id="Duration"
                  />
                  {errors.duration && (
                    <small className="text-danger">{errors.duration}</small>
                  )}
                </div>
                {/* Expected audience size Input Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Expected Audience Size
                  </label>
                  <input
                    value={expected_audience}
                    min="0"
                    onChange={(e) => {
                      setExpected_audience(e.target.value);
                      setErrors((prev) => ({ ...prev, expected_audience: "" }));
                    }}
                    type="number"
                    className="form-control"
                    id="e_Aud_size"
                  />
                  {errors.expected_audience && (
                    <small className="text-danger">
                      {errors.expected_audience}
                    </small>
                  )}
                </div>
                {/* Ticket Price Input Field */}
                <div className="mb-3">
                  <label htmlFor="ticket" className="form-label">
                    Ticket Price
                  </label>
                  <input
                    value={ticket}
                    min="0"
                    onChange={(e) => {
                      setTicket(e.target.value);
                      setErrors((prev) => ({ ...prev, ticket: "" }));
                    }}
                    type="number"
                    className="form-control"
                    id="e_Aud_size"
                  />
                  {errors.ticket && (
                    <small className="text-danger">{errors.ticket}</small>
                  )}
                </div>
                {/* Buttons */}
                <div className="btn_box">
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                    className="btn"
                  >
                    <span>Cancel</span>
                  </button>
                  <button type="submit" className="btn create_fest_Btn">
                    <span>Register</span>
                  </button>
                </div>
              </form>
            </div>
          </Container>
        </Row>
      </section>
    </>
  );
};
