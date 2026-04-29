import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Modal, Row } from "react-bootstrap";
import type { Festival, Stage } from "../../Utilities/Type";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";

type Props = {
  fest: Festival;
};

type StageSize = "main" | "secondary" | "small";

export const Stage_section = ({ fest }: Props) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { all_fest, setAll_fest } = context;

  // Add Artist  ---------------------------
  const [stage_name, setStage_name] = useState("");
  const [capacity, setCapacity] = useState("");
  const [size, setSize] = useState<StageSize | "">("");
  const [stageModal_show, set_StageModal_show] = useState(false);

  const stageHandler_show = () => set_StageModal_show(true);
  const stageHandle_close = () => set_StageModal_show(false);

  function add_Stage() {
    if (!stage_name.trim() || !capacity.trim() || !size.trim())
      return alert("Please fill all input fields.");

    const newStage: Stage = {
      id: Date.now().toString(),
      fest_id: fest.id,
      name: stage_name,
      capacity: Number(capacity),
      size: size as "small" | "main" | "secondary",
    };
    const updatedFestivals = all_fest.map((f) => {
      if (f.id === fest.id) {
        return {
          ...f,

          stages: [...(f.stages || []), newStage],
        };
      }
      return f;
    });

    setAll_fest(updatedFestivals);
    localStorage.setItem("Festivals", JSON.stringify(updatedFestivals));

    setStage_name("");
    setCapacity("");
    setSize("");
    set_StageModal_show(false);
  }
  function deleteArtist(stage_id: string) {
    const updatedFestivals = all_fest.map((f) => {
      if (f.id === fest.id) {
        return {
          ...f,
          stages: fest.stages?.filter((s) => s.id !== stage_id),
        };
      }
      return f;
    });

    setAll_fest(updatedFestivals);
    localStorage.setItem("Festivals", JSON.stringify(updatedFestivals));
  }

  return (
    <>
      <section className="new_fest_section">
        <h3>Stages</h3>
        <Row>
          {fest?.stages?.map((stage) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={stage.id}>
              <div className="col_festure">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  onClick={() => deleteArtist(stage.id)}
                  style={{ cursor: "pointer", color: "white" }}
                />
                <div>
                  <h2 className="col_info-1">{stage.name}</h2>
                  <p className="col_info-2">
                    Stage Size: {stage.size} <br />
                    <span className="col_info-3">
                      Capacity: {stage.capacity}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div
            className="col-lg-3 col-md-4 col-sm-6"
            onClick={stageHandler_show}
          >
            <div className="new_feature">
              <div>
                <FontAwesomeIcon icon={faPlus} /> <br />
                <p>Add Stage</p>
              </div>
            </div>
          </div>
        </Row>
      </section>

      {/* Artist Modal */}
      <Modal show={stageModal_show} onHide={stageHandle_close} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add Stage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stage Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Stage Name"
                value={stage_name}
                onChange={(e) => {
                  setStage_name(e.target.value);
                }}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Capacity"
                value={capacity}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value < 0)
                    return alert("Number should be greater than 0");
                  setCapacity(e.target.value);
                }}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Size</Form.Label>
              <Form.Select
                value={size}
                onChange={(e) => setSize(e.target.value as StageSize)}
              >
                <option value="">Select Stage Size</option>
                <option value="main">Main Stage</option>
                <option value="secondary">Secondary Stage</option>
                <option value="small">Small Stage</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="modal_btn_close" onClick={stageHandle_close}>
            Close
          </button>
          <button className="modal_btn_add" onClick={add_Stage}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
