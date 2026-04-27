import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal, Row } from "react-bootstrap";
import type { Festival, Stage, Vendor } from "../../Utilities/Type";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";

type Props = {
  fest: Festival;
};

type VendorType = "food" | "drink" | "merch";

export const Vender_section = ({ fest }: Props) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { all_fest, setAll_fest } = context;

  // Add Artist  ---------------------------
  const [vendor_name, setVendor_name] = useState("");
  const [vendorType, setVendorType] = useState<VendorType | "">("");
  const [costPerDay, setCostPerDay] = useState("");
  const [revenuePerPerson, setRevenuePerPerson] = useState("");
  const [vendorModal_show, set_VendorModal_show] = useState(false);

  const VendorHandler_show = () => set_VendorModal_show(true);
  const VendorHandle_close = () => set_VendorModal_show(false);

  function add_Vendor() {
    if (
      !vendor_name.trim() ||
      !vendorType.trim() ||
      !costPerDay.trim() ||
      !revenuePerPerson.trim()
    )
      return alert("Please fill all input fields.");

    const newVendor: Vendor = {
      id: Date.now().toString(),
      fest_id: fest.id,
      name: vendor_name,
      type: vendorType as VendorType,
      costPerDay: Number(costPerDay),
      revenuePerPerson: Number(revenuePerPerson),
    };
    const updatedFestivals = all_fest.map((v) => {
      if (v.id === fest.id) {
        return {
          ...v,

          vendors: [...(v.vendors || []), newVendor],
        };
      }
      return v;
    });

    setAll_fest(updatedFestivals);
    localStorage.setItem("Festivals", JSON.stringify(updatedFestivals));

    setVendor_name("");
    setVendorType("");
    setCostPerDay("");
    setRevenuePerPerson("");
    set_VendorModal_show(false);
  }
  function deleteVendor(vendor_id: string) {
    const updatedFestivals = all_fest.map((v) => {
      if (v.id === fest.id) {
        return {
          ...v,
          vendors: fest.vendors?.filter((v) => v.id !== vendor_id),
        };
      }
      return v;
    });

    setAll_fest(updatedFestivals);
    localStorage.setItem("Festivals", JSON.stringify(updatedFestivals));
  }

  return (
    <>
      <section className="new_fest_section">
        <h3>Vendors</h3>
        <Row>
          {fest?.vendors?.map((vendor) => (
            <div className="col-lg-2 col-md-4 col-sm-6" key={vendor.id}>
              <div className="col_festure">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  onClick={() => deleteVendor(vendor.id)}
                  style={{ cursor: "pointer", color: "white" }}
                />
                <div>
                  <h2>{vendor.name}</h2>
                  <p>Type: {vendor.type}</p>
                  <p>Cost/Day: {vendor.costPerDay}</p>
                  <p>Revenue/Person: {vendor.revenuePerPerson}</p>
                </div>
              </div>
            </div>
          ))}

          <div
            className="col-lg-2 col-md-4 col-sm-6"
            onClick={VendorHandler_show}
          >
            <div className="new_feature">
              <div>
                <FontAwesomeIcon icon={faPlus} /> <br />
                <p>Add Vendor</p>
              </div>
            </div>
          </div>
        </Row>
      </section>

      {/* Artist Modal */}
      <Modal
        show={vendorModal_show}
        onHide={VendorHandle_close}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vendor Name"
                value={vendor_name}
                onChange={(e) => {
                  setVendor_name(e.target.value);
                }}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={vendorType}
                onChange={(e) => setVendorType(e.target.value as VendorType)}
              >
                <option value="">Select Vendor Type</option>
                <option value="food">Food</option>
                <option value="drink">Drink</option>
                <option value="merch">Merch</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Cost Per Day</Form.Label>
              <Form.Control
                type="number"
                placeholder="Vendor Cost Per Day"
                value={costPerDay}
                onChange={(e) => setCostPerDay(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Revenue Per Person</Form.Label>
              <Form.Control
                type="number"
                placeholder="Revenue Per Person"
                value={revenuePerPerson}
                onChange={(e) => setRevenuePerPerson(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn_close" onClick={VendorHandle_close}>
            Close
          </Button>
          <Button className="btn_add" onClick={add_Vendor}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
