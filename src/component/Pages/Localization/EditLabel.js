import React, { useState } from "react";
import Topbar from "../../Header/Topbar";
import ListItem from "../../Dashboard/ListItem";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { postDataAxios } from "../../Services/NodeServices";
import Swal from "sweetalert2";

export default function EditLabel(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const LabelDetails = location.state;
  const [getLabelId, setLabelId] = useState(LabelDetails.label_id);
  const [getLabelName, setLabelName] = useState(LabelDetails.label_name);
  const [getCreatedAt, setCreatedAt] = useState(
    moment(LabelDetails.created_at).format("YYYY-MM-DD HH:mm:ss")
  );
  const [getUpdateAt, setUpdateAt] = useState(
    moment().format("YYYY-MM-DD HH:mm:ss")
  );
  const [getShowName, setShowName] = useState("Edit Label");
  const [checkvalidate, setcheckvalidate] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleValidate = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setcheckvalidate(true);
    } else {
      hadleUpdate();
    }
    setValidated(true);
  };

  const hadleUpdate = async () => {
    try {
      let body = {
        label_id: getLabelId,
        label_name: getLabelName,
        created_at: getCreatedAt,
        updated_at: getUpdateAt,
      };
      let result = await postDataAxios(`label/updateLabel/${getLabelId}`, body);
      if (result.status === true) {
        Swal.fire({ icon: "success", text: "Record update" });
        navigate("/AllLabels", { replace: true });
      } else {
        Swal.fire({ icon: "error", text: result.message });
      }
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  return (
    <div id="wrapper">
      <Topbar showName={getShowName} />
      <ListItem />
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card" style={{ borderRadius: 20 }}>
                <div class="card-body ">
                  <b style={{ fontWeight: 500, color: "#000", fontSize: 18 }}>
                    Edit label
                  </b>
                  <div
                    style={{
                      border: "1px solid rgba(216,220,225,1)",
                      marginTop: 10,
                    }}
                  ></div>

                  <div class="row mt-3">
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleValidate}
                    >
                      <Row className="mb-2">
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Label name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            value={getLabelName}
                            placeholder="label name"
                            onChange={(e) => setLabelName(e.target.value)}
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Enter valid first name
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <div class="col-xl-6">
                        <Button
                          variant="primary"
                          type="submit"
                          style={{
                            background: "#f47216",
                            color: "#fff",
                            borderRadius: 5,
                            height: "38px",
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
