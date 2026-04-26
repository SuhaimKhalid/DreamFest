import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const CreateFestival = () => {
  const navigate = useNavigate();
  function CreateFest_Handler() {}
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
                    value={festName}
                    onChange={(e) => {
                      setFestName(e.target.value);
                      setErrors((prev) => ({ ...prev, festName: "" }));
                    }}
                    type="text"
                    className="form-control"
                    id="FestName"
                  />
                  {errors.festName && (
                    <small className="text-danger">{errors.festName}</small>
                  )}
                </div>
                {/* Duration Input Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Duration (Days)
                  </label>
                  <input
                    value={duration}
                    onChange={(e) => {
                      setDuration(e.target.value);
                      setErrors((prev) => ({ ...prev, duration: "" }));
                    }}
                    type="text"
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
                    value={e_Aud_size}
                    onChange={(e) => {
                      setE_Aud_size(e.target.value);
                      setErrors((prev) => ({ ...prev, e_Aud_size: "" }));
                    }}
                    type="number"
                    className="form-control"
                    id="e_Aud_size"
                  />
                  {errors.e_Aud_size && (
                    <small className="text-danger">{errors.e_Aud_size}</small>
                  )}
                </div>
                {/* Buttons */}
                <div className="btn_box">
                  <button
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
