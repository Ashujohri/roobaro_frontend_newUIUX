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
  postDataAndImageAxios,
} from "../../Services/NodeServices";
import Topbar from "../../Header/Topbar";
import ListItem from "../../Dashboard/ListItem";
import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";

export default function AddUser(props) {
  const UserDetail = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [Firstname, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Status, setStatus] = useState("");
  const [MinisterId, setMinisterId] = useState("");
  const [RoleId, setRoleId] = useState("");
  const [Password, setPassword] = useState("");
  const [LanguageId, setLanguageId] = useState("");
  const [getMinister, setMinister] = useState([]);
  const [roles, setRoles] = useState([]);
  const [Picture, setPicture] = useState({ fileBytes: "", fileUrl: "" });
  const [language, setLanguage] = useState([]);
  const [getFlag, setFlag] = useState(false);
  const [checkvalidate, setcheckvalidate] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [getShowName, setShowName] = useState("Add User");

  const handleCompanyPicture = (event) => {
    setPicture({
      fileBytes: event.target.files[0],
      fileUrl: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = async (e) => {
    var formData = new FormData();
    formData.append("firstname", Firstname);
    formData.append("lastname", LastName);
    formData.append("email", EmailAddress);
    formData.append("mobile_number", Mobile);
    formData.append("status", Status);
    formData.append("minister_id", UserDetail.minister_id);
    formData.append("created_at", moment().format("YYYY-MM-DD HH:mm:ss"));
    formData.append("picture", Picture.fileBytes);
    formData.append("role_id", RoleId);
    formData.append("password", Password);
    formData.append("language_id", LanguageId);
    const config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImageAxios("users/addUser", formData, config);
    if (result.status == true) {
      setShowModal(false);
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "User Added Successfully",
      });
      navigate({ pathname: "/users" });
    } else {
      setShowModal(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${result.message}`,
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

  useEffect(function () {
    fetchAllMinister();
    fetchAllRoles();
    fetchAllLanguage();
  }, []);

  const fetchAllMinister = async () => {
    try {
      const result = await getDataAxios(`minister/displayAllMinister`);
      setMinister(result.result);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const fillMinister = () => {
    return getMinister.map(function (item) {
      return (
        <option value={item.id} key={item.id}>
          {item.firstname} {item.lastname}
        </option>
      );
    });
  };

  const fetchAllRoles = async () => {
    try {
      const result = await getDataAxios(`roles/displayRoles`);
      setRoles(result.result);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const fillRoles = () => {
    return roles.map(function (item) {
      return (
        <option value={item.id} key={item.id}>
          {item.roles_name}
        </option>
      );
    });
  };

  const fetchAllLanguage = async () => {
    try {
      const result = await getDataAxios(`language/displayLanguage`);
      setLanguage(result.result);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const fillLanguage = () => {
    return language.map(function (item) {
      return (
        <option value={item.id} key={item.id}>
          {item.language_name}
        </option>
      );
    });
  };

  const handleSelectRole = (e) => {
    setFlag(false);
    setRoleId(e.target.value);
    roles.map((item) => {
      if (item.roles_name == "User" && item.id == e.target.value) {
        setFlag(true);
        setPassword("");
      }
    });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
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
                      <Trans i18nKey="Add_Users"> Add Users </Trans>
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
                              <Trans i18nKey="First_Name"> First Name </Trans>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="FirstName"
                              value={Firstname}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Enter_valid_first_name">
                                {" "}
                                Enter valid first name{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label>
                              <Trans i18nKey="Last_Name"> Last Name </Trans>
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="LastName"
                              value={LastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Enter_valid_last_name">
                                {" "}
                                Enter valid last name{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>
                              <Trans i18nKey="Email"> Email </Trans>
                            </Form.Label>
                            <Form.Control
                              required
                              placeholder="Email"
                              type="text"
                              value={EmailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                              pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Enter_valid_email">
                                {" "}
                                Enter valid email{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom03"
                          >
                            <Form.Label>
                              <Trans i18nKey="Mobile_Number">
                                {" "}
                                Mobile Number{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Control
                              required
                              placeholder="Mobile Number"
                              type="text"
                              value={Mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              pattern="[6-9]{1}[0-9]{9}"
                            />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Enter_valid_mobile_number">
                                {" "}
                                Enter valid mobile number{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>
                              <Trans i18nKey="Status"> Status </Trans>
                            </Form.Label>
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
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Please_select_status">
                                {" "}
                                Please Select Status{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                          {/* <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>Minister</Form.Label>
                            <Form.Select
                              // style={{ background: "white", borderColor: '#bdc3c7' }}
                              aria-label="Default select example"
                              onChange={(e) => setMinisterId(e.target.value)}
                              value={MinisterId}
                              required
                            >
                              <option selected>Select Minister</option>

                              {fillMinister()}
                            </Form.Select>
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Select Minister
                            </Form.Control.Feedback>
                          </Form.Group> */}

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>
                              <Trans i18nKey="Language"> Language </Trans>
                            </Form.Label>
                            <Form.Select
                              // style={{ background: "white", borderColor: '#bdc3c7' }}
                              aria-label="Default select example"
                              onChange={(e) => setLanguageId(e.target.value)}
                              value={LanguageId}
                              required
                            >
                              <option selected> Select language </option>
                              {fillLanguage()}
                            </Form.Select>
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Select_Language">
                                {" "}
                                Select Language{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>
                              <Trans i18nKey="Role"> Role </Trans>
                            </Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              value={RoleId}
                              // onChange={(event) => setRoleId(event.target.value)}
                              onChange={(e) => handleSelectRole(e)}
                              required
                            >
                              <option selected> --Select Role--</option>
                              {fillRoles()}
                            </Form.Select>
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Please_select_role">
                                {" "}
                                Please select role{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                          {getFlag == true ? (
                            <Form.Group
                              as={Col}
                              md="6"
                              controlId="validationCustom04"
                            >
                              <Form.Label>
                                <Trans i18nKey="Password"> Password </Trans>
                              </Form.Label>
                              <Form.Control
                                disabled
                                placeholder="Password"
                                type="password"
                                value=""
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                              ></Form.Control>
                              <Form.Control.Feedback>
                                <Trans i18nKey="look_good"> Looks good! </Trans>
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                <Trans i18nKey="Enter_8_digit_password">
                                  {" "}
                                  Enter 8 digit password{" "}
                                </Trans>
                              </Form.Control.Feedback>
                            </Form.Group>
                          ) : (
                            <Form.Group
                              as={Col}
                              md="6"
                              controlId="validationCustom04"
                            >
                              <Form.Label>
                                <Trans i18nKey="Password"> Password </Trans>
                              </Form.Label>
                              <Form.Control
                                placeholder="Password"
                                type="password"
                                required
                                value={Password}
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                              ></Form.Control>
                              <Form.Control.Feedback>
                                <Trans i18nKey="look_good"> Looks good! </Trans>
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                <Trans i18nKey="Enter_password">
                                  {" "}
                                  Enter password{" "}
                                </Trans>
                              </Form.Control.Feedback>
                            </Form.Group>
                          )}
                        </Row>
                        <Row className="mb-3">
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
                              <Trans i18nKey="Profile_Picture">
                                {" "}
                                Profile Picture{" "}
                              </Trans>
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
                              <Trans i18nKey="Upload"> Upload </Trans>
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
                          />
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
                              <Trans i18nKey="create"> Create </Trans>
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
      <div>{/* <Model1 setOpen={setShowModal} open={showModal} /> */}</div>
    </>
  );
}
