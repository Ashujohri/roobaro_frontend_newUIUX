import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import RadioButton from "../Radiobutton";
import { postDataAxios } from "../../Services/NodeServices";
import { useNavigate, useLocation } from "react-router-dom";
import Topbar from "../../Header/Topbar";
import ListItem from "../../Dashboard/ListItem";

export default function VisitDetails(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const visitorData = location.state;
  const [Firstname, setFirstName] = useState(visitorData.firstname);
  const [LastName, setLastName] = useState(visitorData.lastname);
  const [visitorstatus, setVisitorStatus] = useState(
    visitorData.visitor_status
  );
  const [visitType, setVisitType] = useState(visitorData.visitor_type);
  const [Mobile, setMobile] = useState(visitorData.mobile_number);
  const [vidhanSabha, setVidhanSabha] = useState(visitorData.vidhansabha_id);
  const [DOB, setDOB] = useState(
    moment(visitorData.date_of_birth).format("YYYY-MM-DD")
  );
  const [visitAdded, setVisitAdded] = useState(
    moment(visitorData.created_at).format("YYYY-MM-DD HH:mm:ss")
  );
  const [userId, setUserId] = useState(visitorData.user_id);
  const [engagementTime, setEngagementTime] = useState("");
  const [mantralaya, setMantralaya] = useState(visitorData.mantralya_id);
  const [mantralayaName, setMantralayaName] = useState(
    visitorData.MantralayName
  );
  const [vidhansabhaName, setVidhansabhaName] = useState(
    visitorData.Vidhansabha
  );
  const [MinisterId, setMinisterId] = useState(visitorData.minister_id);
  const [constituency, setConstituency] = useState(
    visitorData.ConstituencyName
  );
  const [getConstituencyId, setConstituencyId] = useState(
    visitorData.constituency_id
  );
  const [Assign, setAssign] = useState("");
  const [Priority, setPriority] = useState([]);
  const [reasonVisit, setReasonVisit] = useState(visitorData.reason_to_visit);
  const [refrence, setReference] = useState(visitorData.refernce);
  const [CustomerPriorityList, setCustomerPriorityList] = useState([]);
  const [checkvalidate, setcheckvalidate] = useState(false);
  const [validated, setValidated] = useState(false);
  const [Gender, setGender] = useState(visitorData.gender);
  const [PhysicallyDisabled, setPhysicallyDisabled] = useState(
    visitorData.physically_disabled
  );
  const [picture, setpicture] = useState(visitorData.picture);
  const [id, setId] = useState(visitorData.id);
  const [getLocationType, setLocationType] = useState(
    visitorData.location_type
  );
  const [getShowName, setShowName] = useState("Visitor Detail");

  // Engade Time//
  const handleClick = () => {
    let startTime = moment().format(visitAdded);
    var endTime = moment().format("hh:mm:ss");
    let aa = moment
      .utc(moment(endTime, " hh:mm:ss").diff(moment(startTime, " hh:mm:ss")))
      .format("hh:mm:ss");
    setEngagementTime(aa);
  };

  const data = [
    { type: "Male", id: 1, color: false },
    { type: "Female", id: 2, color: false },
  ];
  const data2 = [
    { type: "Yes", id: 1, color: false },
    { type: "No", id: 2, color: false },
  ];

  useEffect(function () {
    //   // chkToken();
    handleClick();
  }, []);

  // const chkToken = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/AdminLogin", { replace: true });
  //   } else {
  //     navigate("/visitors", { replace: true });
  //   }
  // };

  const handleSubmit = async () => {
    try {
      let body = {
        firstname: Firstname,
        lastname: LastName,
        mobile_number: Mobile,
        gender: Gender,
        user_id: userId,
        refrence: refrence,
        vidhansabha_id: vidhanSabha,
        physically_disabled: PhysicallyDisabled,
        visitor_type: visitType,
        mantralya_id: mantralaya,
        reason_to_visit: reasonVisit.toString(),
        date_of_birth: DOB,
        minister_id: MinisterId,
        visitor_status: "Completed",
        group_member: "Sachin",
        constituency_id: getConstituencyId,
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        picture: picture,
        id: id,
        created_at: visitAdded,
        location_type: getLocationType ? getLocationType : "Office",
      };
      let result = await postDataAxios(`visitors/updateVisitor/${id}`, body);

      if (result.status == true) {
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Visitors Completed Successfully",
        });
        navigate({ pathname: "/visitors" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.log("error in update detail 🔥🔥🔥", error);
    }
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <b>Visit Details</b>
                      {visitorstatus === "Completed" ||
                      visitorstatus === "completed" ? (
                        <button
                          disabled
                          class="btn btn-sm waves-effect waves-light"
                          style={{
                            background: "#b2bec3",
                            color: "#fff",
                            borderRadius: 15,
                            height: "30px",
                            width: 150,
                            fontSize: 12,
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src="../images/success.png"
                            style={{ width: 15 }}
                          />{" "}
                          Mark as Completed
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSubmit()}
                          type="submit"
                          class="btn btn-sm waves-effect waves-light"
                          style={{
                            background: "#18ae3b",
                            color: "#fff",
                            borderRadius: 15,
                            height: "30px",
                            width: 150,
                            fontSize: 12,
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src="../images/success.png"
                            style={{ width: 15 }}
                          />{" "}
                          Mark as Completed
                        </button>
                      )}
                    </div>
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
                        // onSubmit={handleSubmit}
                      >
                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label>Visit Added</Form.Label>
                            <Form.Control value={visitAdded} disabled />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Auto fill visit added date
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label>Engagement Time</Form.Label>
                            <Form.Control value={engagementTime} disabled />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Auto fill enagenment time
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                              value={Firstname}
                              onChange={setFirstName}
                              disabled
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
                            <Form.Control value={LastName} disabled />
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
                            controlId="validationCustom03"
                          >
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                              value={Mobile}
                              onChange={setMobile}
                              disabled
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
                            controlId="validationCustom04"
                          >
                            <Form.Label>Visitor Type</Form.Label>
                            <Form.Control value={visitType} disabled />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Select visit type
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
                                getType={Gender}
                                data={data}
                                setType={setGender}
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
                                getType={PhysicallyDisabled}
                                data={data2}
                                setType={setPhysicallyDisabled}
                              />
                            </div>
                          </Form.Group>
                        </Row>

                        <Row className="mb-2">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom05"
                          >
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control
                              value={DOB}
                              onChange={setDOB}
                              disabled
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Please pick a valid date
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>Visit Status</Form.Label>
                            <Form.Control value={visitorstatus} disabled />

                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Select visit status
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
                            <Form.Control value={vidhansabhaName} disabled />

                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Select vidhansabha
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>Constituency</Form.Label>
                            <Form.Control value={constituency} disabled />

                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Select relevant constituency
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
                            <Form.Control value={mantralayaName} disabled />

                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Select relevant mantralaya
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label>Refrence</Form.Label>
                            <Form.Control value={refrence} disabled />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Enter reason to visit
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom02"
                          >
                            <Form.Label>Reason to visit</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={reasonVisit}
                              disabled
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Please enter template Description
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <img
                          src={picture}
                          alt=""
                          height={100}
                          style={{ marginTop: 5 }}
                        />
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
