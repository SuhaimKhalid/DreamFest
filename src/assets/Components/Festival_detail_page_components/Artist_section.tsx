import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal, Row } from "react-bootstrap";
import type { Artist, Festival } from "../../Utilities/Type";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";

type Props = {
  fest: Festival;
};
export const Artist_section = ({ fest }: Props) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { all_fest, setAll_fest } = context;

  // Add Artist  ---------------------------
  const [artist_name, setArtist_name] = useState("");
  const [artist_fee, setArtist_fee] = useState("");
  const [artistModal_show, set_artistModal_show] = useState(false);

  const artistHandler_show = () => set_artistModal_show(true);
  const artistHandle_close = () => set_artistModal_show(false);

  function add_Artist() {
    if (!artist_name.trim() || !artist_fee.trim())
      return alert("Please fill all input fields.");

    const newArtist: Artist = {
      id: Date.now().toString(),
      fest_id: fest.id,
      name: artist_name,
      fee: artist_fee,
    };
    const updatedFestivals = all_fest.map((f) => {
      if (f.id === fest.id) {
        return {
          ...f,

          artists: [...(f.artists || []), newArtist],
        };
      }
      return f;
    });

    setAll_fest(updatedFestivals);
    localStorage.setItem("Festivals", JSON.stringify(updatedFestivals));

    setArtist_name("");
    setArtist_fee("");
    set_artistModal_show(false);
  }
  function deleteArtist(artist_id: string) {
    const updatedFestivals = all_fest.map((f) => {
      if (f.id === fest.id) {
        return {
          ...f,
          artists: fest.artists?.filter((a) => a.id !== artist_id),
        };
      }
      return fest;
    });

    setAll_fest(updatedFestivals);
    localStorage.setItem("Festivals", JSON.stringify(updatedFestivals));
  }

  return (
    <>
      <section className="new_fest_section">
        <h3>Artists</h3>
        <Row>
          {fest?.artists?.map((artist) => (
            <div className="col-lg-2 col-md-4 col-sm-6" key={artist.id}>
              <div className="col_festure">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  onClick={() => deleteArtist(artist.id)}
                  style={{ cursor: "pointer", color: "white" }}
                />
                <div>
                  <h2>{artist.name}</h2>
                  <p>Artist Fee: {artist.fee}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="col-lg-2 col-md-4 col-sm-6">
            <div className="new_feature">
              <div onClick={artistHandler_show}>
                <FontAwesomeIcon icon={faPlus} /> <br />
                <p>Add Artist</p>
              </div>
            </div>
          </div>
        </Row>
      </section>

      {/* Artist Modal */}
      <Modal
        show={artistModal_show}
        onHide={artistHandle_close}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Artist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Artist Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Artist Name"
                value={artist_name}
                onChange={(e) => {
                  setArtist_name(e.target.value);
                }}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Artist Fee</Form.Label>
              <Form.Control
                type="number"
                value={artist_fee}
                onChange={(e) => {
                  setArtist_fee(e.target.value);
                }}
                placeholder="Artist Fee"
                autoFocus
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={artistHandle_close}>
            Close
          </Button>
          <Button variant="primary" onClick={add_Artist}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
