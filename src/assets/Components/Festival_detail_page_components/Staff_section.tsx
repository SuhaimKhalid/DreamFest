import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Modal, Row } from "react-bootstrap";
import type { Festival, Staff } from "../../Utilities/Type";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";

type Props = {
  fest: Festival;
};

type StaffRole =
  | "security"
  | "medical"
  | "cleaning"
  | "logistics"
  | "stage_manager";

export const Staff_section = ({ fest }: Props) => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { all_fest, setAll_fest } = context;

  // ---------------- STATE ----------------
  const [role, setRole] = useState<StaffRole | "">("");
  const [count, setCount] = useState("");
  const [costPerPerson, setCostPerPerson] = useState("");
  const [staffModal_show, set_staffModal_show] = useState(false);

  const staffHandler_show = () => set_staffModal_show(true);
  const staffHandle_close = () => set_staffModal_show(false);

  // ---------------- ADD STAFF ----------------
  function add_Staff() {
    if (!role || !count.trim() || !costPerPerson.trim()) {
      return alert("Please fill all input fields.");
    }

    const newStaff: Staff = {
      id: Date.now().toString(),
      fest_id: fest.id,
      role: role as StaffRole,
      count: Number(count),
      costPerPerson: Number(costPerPerson),
    };

    const updatedFestivals = all_fest.map((f) => {
      if (f.id === fest.id) {
        return {
          ...f,
          staff: [...(f.staff || []), newStaff],
        };
      }
      return f;
    });

    setAll_fest(updatedFestivals);
    localStorage.setItem("Festivals", JSON.stringify(updatedFestivals));
    setRole("");
    setCount("");
    setCostPerPerson("");
    set_staffModal_show(false);
  }

  // ---------------- DELETE STAFF ----------------
  function deleteStaff(staff_id: string) {
    const updatedFestivals = all_fest.map((f) => {
      if (f.id === fest.id) {
        return {
          ...f,
          staff: f.staff?.filter((s) => s.id !== staff_id),
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
        <h3>Staff</h3>

        <Row>
          {fest?.staff?.map((s) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={s.id}>
              <div className="col_festure">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  onClick={() => deleteStaff(s.id)}
                  style={{ cursor: "pointer", color: "white" }}
                />

                <div>
                  <h2 className="col_info-1">{s.role.toLocaleUpperCase()}</h2>
                  <p className="col_info-2">
                    Person: {s.count} <br />
                    <span className="col_info-3">
                      Cost/Person: {s.costPerPerson}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* ADD BUTTON */}
          <div
            className="col-lg-3 col-md-4 col-sm-6"
            onClick={staffHandler_show}
          >
            <div className="new_feature">
              <div>
                <FontAwesomeIcon icon={faPlus} /> <br />
                <p>Add Staff</p>
              </div>
            </div>
          </div>
        </Row>
      </section>

      {/* ---------------- MODAL ---------------- */}
      <Modal show={staffModal_show} onHide={staffHandle_close}>
        <Modal.Header closeButton>
          <Modal.Title>Add Staff</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* ROLE */}
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value as StaffRole)}
              >
                <option value="">Select Role</option>
                <option value="security">Security</option>
                <option value="medical">Medical</option>
                <option value="cleaning">Cleaning</option>
                <option value="logistics">Logistics</option>
                <option value="stage_manager">Stage Manager</option>
              </Form.Select>
            </Form.Group>

            {/* COUNT */}
            <Form.Group className="mb-3">
              <Form.Label>Count</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={count}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value < 0)
                    return alert("Number should be greater than 0");
                  setCount(e.target.value);
                }}
                placeholder="Number of staff"
              />
            </Form.Group>

            {/* COST */}
            <Form.Group className="mb-3">
              <Form.Label>Cost Per Person</Form.Label>
              <Form.Control
                type="number"
                value={costPerPerson}
                onChange={(e) => setCostPerPerson(e.target.value)}
                placeholder="Cost per person"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <button className="modal_btn_close" onClick={staffHandle_close}>
            Close
          </button>
          <button className="modal_btn_add" onClick={add_Staff}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
