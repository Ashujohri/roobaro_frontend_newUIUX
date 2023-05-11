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

export default function AddVisitor(props) {
  var UserData = JSON.parse(localStorage.getItem("userData"));
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
  const [visitType, setVisitType] = useState("");
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
  const [CreatedAt, setCreatedAt] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));
  const [camstatus, setCamStatus] = useState(false);
  const webcamRef = React.useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showCam, setShowCam] = useState(true);
  const [otp, setOtp] = useState("");
  const [OTP, setOTP] = useState("");
  const [getLocationType, setLocationType] = useState("");
  const [getMinister, setMinister] = useState([]);
  const [error, setError] = useState(false);
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
  }, []);

  const chkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/AdminLogin", { replace: true });
    } else {
      navigate("/AddVisitor", { replace: true });
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
    var otp = parseInt(Math.random() * 8999) + 1000;
    // alert(otp);
    setOtp(otp);
  };

  const handleData = async () => {
    try {
      if (parseInt("9999") === parseInt(OTP)) {
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
          refrence: refrence,
          reason_to_visit: reasonVisit.toString(),
          picture: picture,
          user_id: UserData.id,
          created_at:CreatedAt,
          minister_id: getMinisterId,
          group_member: "Sachin",
          visitor_status: "ongoing",
          location_type: getLocationType ? getLocationType : "Office",
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
          navigate({ pathname: "/visitors" });
        } else {
          setShowModal(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${result.message}`,
          });
        }
      } else {
        setError("Please Enter Otp");
      }
    } catch (error) {
      console.log("error in cath add visitor 🔥", error);
    }
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
                      Add Visitors
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
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              value={Firstname}
                              placeholder="Firstname"
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
                            controlId="validationCustom02"
                          >
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                              placeholder="Lastname"
                              required
                              type="text"
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
                            controlId="validationCustom01"
                          >
                            <Form.Label>Mobile Number</Form.Label>
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
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Enter valid mobile number
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom05"
                          >
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control
                              required
                              type="date"
                              value={DOB}
                              onChange={(e) => {
                                setDOB(e.target.value);
                              }}
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Please pick a valid date
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-2">
                          <Form.Group as={Col} md="6">
                            <div style={{ marginBottom: 12 }}>Gender</div>
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
                            <div style={{ marginBottom: 12 }}>
                              Physically Disabled
                            </div>
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
                                fetchMinister(e.target.value);
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
                            <Form.Label>Minister</Form.Label>
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
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Select Constituency
                            </Form.Control.Feedback>
                          </Form.Group>

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
                        </Row>

                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>Visit type</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) => setVisitType(e.target.value)}
                              value={visitType}
                              required
                            >
                              <option selected value="">
                                Select visit type
                              </option>
                              <option value="Single">Single</option>
                              <option value="group">group</option>
                            </Form.Select>
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Select Visit Type
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label>Refrence</Form.Label>
                            <Form.Control
                              placeholder="Reference"
                              required
                              type="text"
                              value={refrence}
                              onChange={(e) => setReference(e.target.value)}
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Enter Refrence
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom02"
                          >
                            <Form.Label>Reason to visit</Form.Label>
                            <Form.Control
                              required
                              placeholder="Reason to visit"
                              as="textarea"
                              rows={3}
                              value={reasonVisit}
                              onChange={(e) => setReasonVisit(e.target.value)}
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Enter Reason To Visit
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
                              Media
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
                                        Capture photo
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
                            setOTP={setOTP}
                            OTP={OTP}
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
                            Create
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
