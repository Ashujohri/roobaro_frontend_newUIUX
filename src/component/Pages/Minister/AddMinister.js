import moment from "moment/moment";
import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Model1 from "../../Models/Model1";
import { Avatar, Button } from "@mui/material";
import {
  getDataAxios,
  postData,
  postDataAndImageAxios,
  postDataAxios,
} from "../../Services/NodeServices";
import Topbar from "../../Header/Topbar";
import ListItem from "../../Dashboard/ListItem";
import { useNavigate } from "react-router-dom";

export default function AddMinister(props) {
  const navigate = useNavigate();
  const UserData = JSON.parse(localStorage.getItem("userData"));
  const [Firstname, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Status, setStatus] = useState("");
  const [constituency, setConstituency] = useState("");
  const [mantralaya, setMantralaya] = useState("");
  const [getAllVidhansabha, setAllVidhanSabha] = useState([]);
  const [getAllConstituency, setAllConstituency] = useState([]);
  const [getAllMantralaya, setAllMantralaya] = useState([]);
  const [vidhanSabha, setVidhanSabha] = useState("");
  const [Picture, setPicture] = useState({ fileBytes: "", fileUrl: "" });
  const [checkvalidate, setcheckvalidate] = useState(false);
  const [stateId, setStateId] = useState(UserData.StateId);
  const [validated, setValidated] = useState(false);

  const [showModal, setShowModal] = useState(false);
  console.log("Picture", Picture);
  const handleCompanyPicture = (event) => {
    setPicture({
      fileBytes: event.target.files[0],
      fileUrl: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = async (e) => {
    // var formData = new FormData();
    // formData.append("firstname", Firstname);
    // formData.append("lastname", LastName);
    // formData.append("email", EmailAddress);
    // formData.append("mobile_number", Mobile);
    // formData.append("status", Status);
    // formData.append("created_at", moment().format("YYYY-MM-DD HH:mm:ss"));
    // formData.append("picture", Picture.fileBytes);
    // const config = { headers: { "content-type": "multipart/form-data" } };
    var body = {
      firstname: Firstname,
      lastname: LastName,
      mobile_number: Mobile,
      email: EmailAddress,
      vidhansabha_id: vidhanSabha,
      mantralya_id: mantralaya,
      constituency_id: constituency,
      picture: Picture.fileBytes,
      status: Status,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    const config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImageAxios(
      "minister/addMinisters",
      body,
      config
    );
    alert(JSON.stringify(result));
    if (result.status == true) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Minister Added Successfully",
      });

      setShowModal(false);
      navigate({ pathname: "/minister" });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleValidate = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setcheckvalidate(true);
    } else {
      setShowModal(true);
    }
    setValidated(true);
  };

  const fetchAllVidhansabha = async () => {
    try {
      const result = await getDataAxios(
        `vidhansabha/displayVidhansabha/${stateId}`
      );
      setAllVidhanSabha(result.result);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const fillVidhansabha = () => {
    return getAllVidhansabha.map(function (item) {
      return (
        <option value={item.id} key={item.id}>
          {item.vidhansabha_name}
        </option>
      );
    });
  };

  const fetchAllConstituency = async (id) => {
    try {
      const result = await getDataAxios(
        `constituency/displayConstituency/${id}`
      );
      setAllConstituency(result.result);
    } catch (error) {
      console.log("error in catch", error);
    }
  };
  const fillConstituency = () => {
    return getAllConstituency.map(function (item) {
      return (
        <option value={item.id} key={item.id}>
          {item.constituency_name}
        </option>
      );
    });
  };

  const fetchAllMantralaya = async () => {
    try {
      const result = await getDataAxios(`mantralay/displayMantralay`);
      setAllMantralaya(result.result);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const fillMantralaya = () => {
    return getAllMantralaya.map(function (item) {
      return (
        <option value={item.id} key={item.id}>
          {item.mantralya_name}
        </option>
      );
    });
  };
  useEffect(function () {
    fetchAllVidhansabha();
    fetchAllConstituency();
    fetchAllMantralaya();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div id="wrapper">
        <Topbar />
        <ListItem />
        <div class="content-page">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card" style={{ borderRadius: 20 }}>
                  <div class="card-body ">
                    <b style={{ fontWeight: 500, color: "#000", fontSize: 18 }}>
                      Add Ministers
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
                            <Form.Label
                            // style={{
                            //   fontFamily: "Poppins",
                            //   color: "#90979f",
                            //   fontWeight: 800,
                            // }}
                            >
                              First Name
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="FirstName"
                              value={Firstname}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Enter valid first name
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="LastName"
                              value={LastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Enter valid last name
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              required
                              placeholder="Email"
                              type="text"
                              value={EmailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                              pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Enter valid email
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom03"
                          >
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                              required
                              maxLength={10}
                              placeholder="Mobile Number"
                              type="text"
                              value={Mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              pattern="[6-9]{1}[0-9]{9}"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Enter valid mobile number
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>Vidhansabha</Form.Label>
                            <Form.Select
                              // style={{ background: "#f7f7f7",borderColor:'#bdc3c7'}}
                              aria-label="Default select example"
                              value={vidhanSabha}
                              required
                              onChange={(e) => {
                                setVidhanSabha(e.target.value);
                                fetchAllConstituency(e.target.value);
                              }}
                            >
                              <option selected value="">
                                Select VidhanSabha
                              </option>

                              {fillVidhansabha()}
                            </Form.Select>
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Select VidhanSabha
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>Constituency</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              value={constituency}
                              required
                              onChange={(e) => {
                                setConstituency(e.target.value);
                              }}
                            >
                              <option selected value="">
                                Select Constituency
                              </option>
                              {fillConstituency()}
                            </Form.Select>
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Select Constituency
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>Mantralaya</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) => setMantralaya(e.target.value)}
                              value={mantralaya}
                              required
                            >
                              <option selected value="">
                                select mantralaya
                              </option>

                              {fillMantralaya()}
                            </Form.Select>
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Select Mantralaya
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) => setStatus(e.target.value)}
                              value={Status}
                              required
                            >
                              <option selected>Select status</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </Form.Select>
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Select Status
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="2"
                            controlId="validationCustom07"
                          >
                            <Form.Label
                              style={{
                                fontFamily: "Poppins",
                                color: "#90979f",
                                fontWeight: 800,
                              }}
                            >
                              Profile Picture
                            </Form.Label>

                            <Button
                              onChange={handleCompanyPicture}
                              style={{
                                background: "#f7f7f7",
                                borderColor: "#bdc3c7",
                                fontFamily: "Poppins",
                                color: "#90979f",
                                fontWeight: 600,
                                fontSize: 14,
                                border: 1,
                              }}
                              variant="contained"
                              component="label"
                            >
                              Upload
                              <input
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                              />
                            </Button>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="2"
                            controlId="validationCustom08"
                          >
                            <Avatar
                              alt="Remy Sharp"
                              src={Picture.fileUrl}
                              sx={{ width: 70, height: 70 }}
                              variant="square"
                            />
                          </Form.Group>
                          <Model1
                            handleSubmit={handleSubmit}
                            setOpen={setShowModal}
                            open={showModal}
                            title={"Are you sure you wants to add minister?"}
                          />
                          <div className="mb-2">
                            <div
                              className="form-check"
                              style={{
                                marginTop: 15,
                                fontWeight: 800,
                                color: "grey",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="checkbox-signin"
                                defaultChecked=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkbox-signin"
                              >
                                Sent weekly visitors report
                              </label>
                            </div>
                          </div>
                        </Row>
                        <div class="col-xl-6">
                          <div class="button-list">
                            <button
                              type="submit"
                              class="btn btn-sm waves-effect waves-light"
                              style={{
                                background: "#ff7e24",
                                color: "#fff",
                                borderRadius: 5,
                                height: "38px",
                                width: "100px",
                              }}
                            >
                              Create
                            </button>
                          </div>
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
    </>
  );
}
