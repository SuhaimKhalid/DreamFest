import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { AppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";

export const Festival_Data_page = () => {
  const { id } = useParams();

  const context = useContext(AppContext);
  if (!context) return null;
  const { all_fest } = context;
  const current_fest = all_fest.find((f) => f.id === id);
  return (
    <>
      <Container>
        <section className="Fest_info_section">
          <Row>
            <div className="col-lg-8 col-md-12">
              <div className="fest_info_pt1">
                <h1>2</h1>
                <h1>{current_fest?.festival_Name}</h1>
              </div>
            </div>
          </Row>
        </section>
      </Container>
    </>
  );
};
