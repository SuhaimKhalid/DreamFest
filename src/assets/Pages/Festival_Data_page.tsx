import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";

import { Festival_info } from "../Components/Festival_detail_page_components/Festival_info";
import { Artist_section } from "../Components/Festival_detail_page_components/Artist_section";
import { Stage_section } from "../Components/Festival_detail_page_components/Stage_section";
import { Vender_section } from "../Components/Festival_detail_page_components/Vendor_section";
import { Staff_section } from "../Components/Festival_detail_page_components/Staff_section";
import { SimulationResult } from "../Components/Festival_detail_page_components/SimulationResult";

export const Festival_Data_page = () => {
  const { id } = useParams();

  const context = useContext(AppContext);
  if (!context) return null;
  const { all_fest } = context;
  // ----------------------------
  const current_fest = all_fest.find((f) => f.id === id);
  if (!current_fest) return <h1>Festival Not Found.</h1>;

  return (
    <>
      <Container>
        <Festival_info fest={current_fest} />
        <SimulationResult fest={current_fest} />
        <Artist_section fest={current_fest} />
        <Stage_section fest={current_fest} />
        <Vender_section fest={current_fest} />
        <Staff_section fest={current_fest} />
      </Container>
    </>
  );
};
