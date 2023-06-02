import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import RadioButton from "../Radiobutton";
import Webcam from "react-webcam";
import { getDataAxios, postDataAxios } from "../../Services/NodeServices";
import OtpModel from "../../Models/OtpModel";
import Topbar from "../../Header/Topbar";
import ListItem from "../../Dashboard/ListItem";
import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";

export default function AddVisitor(props) {
  var UserData = JSON.parse(localStorage.getItem("userData"));
  var fetchLocal = JSON.parse(localStorage.getItem("roleName"));
  const navigate = useNavigate();
  const [Firstname, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mobile, setMobile] = useState("");
  const [id, setId] = useState("");
  const [Gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [vidhanSabha, setVidhanSabha] = useState("");
  const [constituency, setConstituency] = useState("");
  const [mantralaya, setMantralaya] = useState("");
  const [visitType, setVisitType] = useState("Single");
  const [refrence, setReference] = useState("");
  const [reasonVisit, setReasonVisit] = useState("");
  const [getMinisterId, setMinisterId] = useState("");
  const [PhysicallyDisabled, setPhysicallyDisabled] = useState("");
  const [checkvalidate, setcheckvalidate] = useState(false);
  const [visitorStatus, setVisitorStatus] = useState("");
  const [getAllVidhansabha, setAllVidhanSabha] = useState([]);
  const [getAllConstituency, setAllConstituency] = useState([]);
  const [getAllMantralaya, setAllMantralaya] = useState([]);
  const [stateId, setStateId] = useState(UserData.StateId);
  const [picture, setPicture] = useState("");
  const [camstatus, setCamStatus] = useState(false);
  const webcamRef = React.useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showCam, setShowCam] = useState(true);
  const [getOTP, setOTP] = useState("");
  const [getInputOTP, setgetInputOTP] = useState("");
  const [getLocationType, setLocationType] = useState(
    JSON.parse(localStorage.getItem("location_type"))
  );
  const [getMinister, setMinister] = useState([]);
  const [error, setError] = useState(false);
  const [getShowName, setShowName] = useState("Add Visitor");
  const [userdefault, setUserDefault] = useState("");
  const [names, setNames] = useState([userdefault]);

  const videoConstraints = {
    width: 200,
    height: 200,
    facingMode: "user",
  };
  const capture = React.useCallback(() => {
    if (webcamRef.current.getScreenshot() != "") {
      setPicture(webcamRef.current.getScreenshot());
      setShowCam(false);
    }
  }, [webcamRef]);

  const handleOpen = () => {
    setCamStatus(true);
  };
  const [validated, setValidated] = useState(false);

  const handleClose = () => setCamStatus(false);

  const data = [
    { type: "Male", id: 1, color: false },
    { type: "Female", id: 2, color: false },
  ];
  const data2 = [
    { type: "Yes", id: 1, color: false },
    { type: "No", id: 2, color: false },
  ];

  useEffect(() => {
    chkToken();
    fetchAllVidhansabha();
    fetchAllConstituency();
    fetchAllMantralaya();
    fetchUserData();
  }, []);

  const chkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/AdminLogin", { replace: true });
    } else {
      navigate("/AddVisitor", { replace: true });
    }
  };

  const fetchUserData = async () => {
    try {
      const result = await getDataAxios(`users/fetchUserDetail/${UserData.id}`);
      if (result.status === true) {
        setLocationType(result.result[0].user_location);
      }
    } catch (error) {
      console.log("error in catch", error);
    }
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

  const fillMinister = () => {
    return getMinister.map(function (item) {
      return (
        <option value={item.id} key={item.id}>
          {item.firstname} {item.lastname}
        </option>
      );
    });
  };

  const fetchMinister = async (id) => {
    try {
      const result = await getDataAxios(`minister/displayMinister/${id}`);
      setMinister(result.result);
    } catch (error) {
      console.log("error in fetch minister", error);
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

  const handleValidate = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setcheckvalidate(true);
    } else {
      setShowModal(true);
      handleOtp();
    }
    setValidated(true);
  };

  const handleOtp = async () => {
    try {
      var otp = parseInt(Math.random() * 8999) + 1000;
      let response = await postDataAxios("users/LoginSendOTP", {
        mobile: Mobile,
        otp: otp,
      });
      setOTP(otp);
      if (response.status === true) {
        Swal.fire({ icon: "success", text: "Re-send OTP" });
      }
    } catch (error) {
      console.log("error in resend", error);
    }
  };

  const handleData = async () => {
    try {
      if (parseInt(getOTP) === parseInt(getInputOTP)) {
        let body = {
          firstname: Firstname,
          lastname: LastName,
          mobile_number: Mobile,
          gender: Gender,
          physically_disabled: PhysicallyDisabled,
          date_of_birth: DOB,
          visitor_type: visitType,
          vidhansabha_id: vidhanSabha,
          mantralya_id: mantralaya,
          refernce: refrence,
          reason_to_visit: reasonVisit.toString(),
          picture: picture,
          user_id: UserData.id,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
          minister_id: getMinisterId,
          group_member: names.toString(),
          visitor_status: "ongoing",
          location_type: getLocationType,
          constituency_id: constituency,
        };

        let result = await postDataAxios(`visitors/addVisitor`, body);
        if (result.status == true) {
          setShowModal(false);
          Swal.fire({
            icon: "success",
            title: "Done",
            text: "Visitor Added Successfully",
          });
          fetchLocal.includes("super_admin") === true ||
          fetchLocal.includes("minister") === true
            ? navigate("/visitors", { replace: true })
            : navigate("/userDashVisitor", { replace: true });
        } else {
          setShowModal(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${result.message}`,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          text: "Invalid OTP",
        });
      }
    } catch (error) {
      console.log("error in cath add visitor 🔥", error);
    }
  };

  const handleAdd = () => {
    const data = [...names, []];
    setNames(data);
  };

  const handleChange = (onchangevalue, i) => {
    const inputdata = [...names];
    inputdata[i] = onchangevalue.target.value;
    setNames(inputdata);
  };

  const handleDelete = (i) => {
    const deletename = [...names];
    deletename.splice(i, 1);
    setNames(deletename);
  };

  const handleVisitType = (e) => {
    setVisitType(e.target.value);
    setNames([userdefault]);
    setFirstName("");
    setLastName("");
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
                      <Trans i18nKey="Add_Visit"> Add Visitors </Trans>
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
                            md="12"
                            controlId="validationCustom04"
                          >
                            <Form.Label>
                              <Trans i18nKey="Visit_Type"> Visit type </Trans>
                            </Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) => handleVisitType(e)}
                              value={visitType}
                              required
                            >
                              <option selected>Select visit type</option>
                              <option value="Single">Single</option>
                              <option value="Group">Group</option>
                            </Form.Select>
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Select_visitor_type">
                                {" "}
                                Select Visit Type{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        {visitType === "Single" ? (
                          <Row className="mb-2">
                            <Form.Group
                              as={Col}
                              md="6"
                              controlId="validationCustom01"
                            >
                              <Form.Label>
                                <Trans i18nKey="First_Name"> First name </Trans>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={Firstname}
                                placeholder="Firstname"
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
                              controlId="validationCustom02"
                            >
                              <Form.Label>
                                <Trans i18nKey="Last_Name"> Last name </Trans>
                              </Form.Label>
                              <Form.Control
                                placeholder="Lastname"
                                required
                                type="text"
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
                        ) : (
                          <>
                            <Row className="mb-2">
                              <Form.Group
                                as={Col}
                                md="6"
                                controlId="validationCustom01"
                              >
                                <Form.Label>
                                  <Trans i18nKey="First_Name">
                                    {" "}
                                    First name{" "}
                                  </Trans>
                                </Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  value={Firstname}
                                  placeholder="Firstname"
                                  onChange={(e) => setFirstName(e.target.value)}
                                />
                                <Form.Control.Feedback>
                                  <Trans i18nKey="look_good">
                                    {" "}
                                    Looks good!{" "}
                                  </Trans>
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
                                controlId="validationCustom02"
                              >
                                <Form.Label>
                                  <Trans i18nKey="Last_Name"> Last name </Trans>
                                </Form.Label>
                                <Form.Control
                                  placeholder="Lastname"
                                  required
                                  type="text"
                                  value={LastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                                <Form.Control.Feedback>
                                  <Trans i18nKey="look_good">
                                    {" "}
                                    Looks good!{" "}
                                  </Trans>
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                  <Trans i18nKey="Enter_valid_last_name">
                                    {" "}
                                    Enter valid last name{" "}
                                  </Trans>
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Row>
                            {names.map((item, index) => {
                              return (
                                <Row
                                  className="mb-2"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end",
                                  }}
                                >
                                  <Form.Group
                                    as={Col}
                                    md="6"
                                    controlId="validationCustom01"
                                  >
                                    <Form.Label>
                                      <Trans i18nKey="group_member_name">
                                        {" "}
                                        Group member name{" "}
                                      </Trans>
                                    </Form.Label>
                                    <Form.Control
                                      required
                                      type="text"
                                      value={item}
                                      placeholder="Group member name"
                                      onChange={(e) => handleChange(e, index)}
                                    />
                                    <Form.Control.Feedback>
                                      <Trans i18nKey="look_good">
                                        {" "}
                                        Looks good!{" "}
                                      </Trans>
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                      <Trans i18nKey="Enter_valid_name">
                                        {" "}
                                        Enter valid name{" "}
                                      </Trans>
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                  <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationCustom01"
                                  >
                                    {index === 0 ? (
                                      names.length === 9 ? (
                                        <button
                                          disabled
                                          className="btn btn-primary"
                                          style={{
                                            borderRadius: 12,
                                          }}
                                        >
                                          <i className="fe-plus-circle">
                                            <Trans i18nKey="Add"> Add </Trans>
                                          </i>
                                        </button>
                                      ) : (
                                        <i
                                          style={{
                                            borderRadius: 12,
                                          }}
                                          className="fe-plus-circle btn btn-primary"
                                          onClick={() => handleAdd()}
                                        >
                                          <Trans i18nKey="Add"> Add </Trans>
                                        </i>
                                      )
                                    ) : (
                                      <i
                                        style={{ borderRadius: 12 }}
                                        className="fe-minus-circle btn btn-danger"
                                        onClick={() => handleDelete(index)}
                                      >
                                        <Trans i18nKey="Delete"> Delete </Trans>
                                      </i>
                                    )}
                                  </Form.Group>
                                </Row>
                              );
                            })}
                          </>
                        )}

                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label>
                              <Trans i18nKey="Mobile_Number">
                                {" "}
                                Mobile number{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Control
                              required
                              placeholder="Mobile Number"
                              type="text"
                              value={Mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              maxLength={10}
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

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom05"
                          >
                            <Form.Label>
                              <Trans i18nKey="Date_of_birth">
                                {" "}
                                Date of birth{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Control
                              required
                              type="date"
                              value={DOB}
                              onChange={(e) => {
                                setDOB(e.target.value);
                              }}
                            />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Please_pick_a_valid_date">
                                {" "}
                                Please pick a valid date{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-2">
                          <Form.Group as={Col} md="6">
                            <Form.Label>
                              <Trans i18nKey="Gender"> Gender </Trans>
                            </Form.Label>
                            <div
                              style={{ flexDirection: "row", display: "flex" }}
                            >
                              <RadioButton
                                setType={setGender}
                                getType={Gender}
                                data={data}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Col} md="6">
                            <Form.Label>
                              <Trans i18nKey="Physically_Disabled">
                                {" "}
                                Physically disabled{" "}
                              </Trans>
                            </Form.Label>

                            <div
                              style={{ flexDirection: "row", display: "flex" }}
                            >
                              <RadioButton
                                setType={setPhysicallyDisabled}
                                getType={PhysicallyDisabled}
                                data={data2}
                              />
                            </div>
                          </Form.Group>
                        </Row>

                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>
                              <Trans i18nKey="Vidhansabha"> Vidhansabha </Trans>
                            </Form.Label>
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
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Select_Vidhansabha">
                                {" "}
                                Select VidhanSabha{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>
                              <Trans i18nKey="Constituency">
                                {" "}
                                Constituency{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              value={constituency}
                              required
                              onChange={(e) => {
                                setConstituency(e.target.value);
                                fetchMinister(e.target.value);
                              }}
                            >
                              <option selected value="">
                                Select Constituency
                              </option>
                              {fillConstituency()}
                            </Form.Select>
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Select_Constituency">
                                {" "}
                                Select Constituency{" "}
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
                              <Trans i18nKey="Ministers"> Minister </Trans>
                            </Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              value={getMinisterId}
                              required
                              onChange={(e) => {
                                setMinisterId(e.target.value);
                              }}
                            >
                              <option selected value="">
                                Select Minister
                              </option>
                              {fillMinister()}
                            </Form.Select>
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Please_select_minister">
                                Please Select Minister{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>
                              <Trans i18nKey="Mantralaya"> Mantralaya </Trans>
                            </Form.Label>
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
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Select_Mantralaya">
                                {" "}
                                Select Mantralaya{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label>
                              <Trans i18nKey="Reference"> Reference </Trans>
                            </Form.Label>
                            <Form.Control
                              placeholder="Reference"
                              required
                              type="text"
                              value={refrence}
                              onChange={(e) => setReference(e.target.value)}
                            />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Enter_reference,_If_any!">
                                {" "}
                                Enter_reference,_If_any!{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label>
                              <Trans i18nKey="location_type">
                                {" "}
                                Location Type{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Control
                              placeholder="Location"
                              required
                              type="text"
                              value={getLocationType}
                              disabled
                              // onChange={(e) => setLocationType(e.target.value)}
                            />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Please_enter_location_type">
                                {" "}
                                Please Enter Location type{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              <Trans i18nKey="Reason_to_visit">
                                {" "}
                                Reason to visit{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Control
                              required
                              placeholder="Reason to visit"
                              as="textarea"
                              rows={3}
                              value={reasonVisit}
                              onChange={(e) => setReasonVisit(e.target.value)}
                            />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Please_enter_reason_to_visit">
                                {" "}
                                Please Enter Reason To Visit{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} md="1">
                            <div
                              style={{
                                fontFamily: "Poppins",
                                color: "#90979f",
                                fontWeight: 800,
                              }}
                            >
                              <Trans i18nKey="Media"> Media </Trans>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "48px",
                                backgroundColor: "#ebebeb",
                                width: 50,
                                fontSize: "20px",
                                borderRadius: 10,
                              }}
                              onClick={handleOpen}
                            >
                              <img src="images/camera.png" alt="" height={24} />
                            </div>
                            {showCam && (
                              <div>
                                {camstatus ? (
                                  <div>
                                    <div style={{ marginTop: 10 }}>
                                      <Webcam
                                        audio={false}
                                        height={150}
                                        ref={webcamRef}
                                        width={150}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={videoConstraints}
                                        mirrored={true}
                                      />
                                      <button
                                        style={{
                                          background: "pink",
                                          width: 150,
                                          borderRadius: 10,
                                        }}
                                        onClick={capture}
                                      >
                                        <Trans i18nKey="Capture_photo">
                                          {" "}
                                          Capture photo{" "}
                                        </Trans>
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            )}
                            <div>
                              <img
                                src={picture}
                                alt=""
                                height={100}
                                style={{ marginTop: 5 }}
                              />
                            </div>
                          </Form.Group>
                          <OtpModel
                            error={error}
                            setOTP={setgetInputOTP}
                            OTP={getInputOTP}
                            yesClick={handleData}
                            setOpen={setShowModal}
                            open={showModal}
                          />
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
                            <Trans i18nKey="create"> Create </Trans>
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
    </>
  );
}
