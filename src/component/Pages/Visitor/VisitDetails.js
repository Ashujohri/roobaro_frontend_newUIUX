import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import RadioButton from "../Radiobutton";
import { ServerURL, postDataAxios } from "../../Services/NodeServices";
import { useNavigate, useLocation } from "react-router-dom";
import Topbar from "../../Header/Topbar";
import ListItem from "../../Dashboard/ListItem";
import { Trans } from "react-i18next";

export default function VisitDetails(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const visitorData = location.state;
  console.log("visitorData", visitorData);
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
  const [engagementTime, setEngagementTime] = useState(
    moment.utc(visitorData.engage_time * 1000).format("HH:mm:ss")
  );
  const [mantralaya, setMantralaya] = useState(visitorData.mantralya_id);
  const [mantralayaName, setMantralayaName] = useState(
    visitorData.MantralayName
  );
  const [vidhansabhaName, setVidhansabhaName] = useState(
    visitorData.VidhansabhaName
  );
  const [MinisterId, setMinisterId] = useState(visitorData.minister_id);
  const [constituency, setConstituency] = useState(
    visitorData.ConstituencyName
  );
  const [getConstituencyId, setConstituencyId] = useState(
    visitorData.constituency_id
  );
  const [reasonVisit, setReasonVisit] = useState(visitorData.reason_to_visit);
  const [refrence, setReference] = useState(visitorData.refernce);
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
  const [getGroupName, setGroupName] = useState(visitorData.group_member);
  const [showEngagementTime, setShowEngagementTime] = useState("");

  // Engade Time//
  const handleClick = () => {
    let startTime = moment(visitAdded).format("HH:mm:ss");
    let hms1 = startTime;
    let a1 = hms1.split(":");
    let seconds1 = a1[0] * 60 * 60 + +a1[1] * 60 + +a1[2];
    let endTime = moment().format("HH:mm:ss");
    let hms2 = endTime;
    let a2 = hms2.split(":");
    let seconds2 = a2[0] * 60 * 60 + +a2[1] * 60 + +a2[2];
    let engagetime = seconds2 - seconds1;
    let d = Number(engagetime);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);
    let hDisplay = h > 0 ? h + (h == 1 ? " hour: " : " hours: ") : "";
    let mDisplay = m > 0 ? m + (m == 1 ? " minute: " : " minutes: ") : "";
    let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    let aa = hDisplay + mDisplay + sDisplay;
    // console.log("aaaaaaaaaaaaa", aa);
    setShowEngagementTime(aa);
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
      let endDate = moment().format("YYYY-MM-DD HH:mm:ss");
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
        user_id: userId,
        created_at: visitAdded,
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        minister_id: MinisterId,
        group_member: getGroupName,
        visitor_status: "Completed",
        engage_time: showEngagementTime,
        location_type: getLocationType ? getLocationType : "Office",
        constituency_id: getConstituencyId,
        id: id,
      };
      console.log("body", body);
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
                      <b>
                        <Trans i18nKey="visit_details"> Visitor Details </Trans>
                      </b>
                      {visitorstatus === "Completed" ||
                      visitorstatus === "completed" ? null : (
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
                            fontSize: 11,
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src="../images/success.png"
                            style={{ width: 15 }}
                          />{" "}
                          <Trans i18nKey="mark_as_completed">
                            {" "}
                            Mark as Completed{" "}
                          </Trans>
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
                            <Form.Label>
                              <Trans i18nKey="visit_added">
                                {" "}
                                Visitor Added Time{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Control value={visitAdded} disabled />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Auto_fill_visitor_added_date">
                                {" "}
                                Auto fill visit added date{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              <Trans i18nKey="Engagement_time">
                                {" "}
                                Engagement Time{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Control value={engagementTime} disabled />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Auto_fill_enagenment_time">
                                {" "}
                                Auto fill enagenment time{" "}
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
                              <Trans i18nKey="First_Name"> First name </Trans>
                            </Form.Label>
                            <Form.Control
                              value={Firstname}
                              onChange={setFirstName}
                              disabled
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
                            <Form.Control value={LastName} disabled />
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
                            controlId="validationCustom03"
                          >
                            <Form.Label>
                              <Trans i18nKey="Mobile_Number">
                                {" "}
                                Mobile Number{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Control
                              value={Mobile}
                              onChange={setMobile}
                              disabled
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
                            controlId="validationCustom04"
                          >
                            <Form.Label>
                              <Trans i18nKey="Visit_Type"> Visitor Type </Trans>
                            </Form.Label>
                            <Form.Control value={visitType} disabled />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Select_visitor_type">
                                {" "}
                                Select visitor type{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="mb-2">
                          <Form.Group as={Col} md="6">
                            <div style={{ marginBottom: 12 }}>
                              <Trans i18nKey="Gender"> Gender </Trans>
                            </div>
                            <div
                              style={{ flexDirection: "row", display: "flex" }}
                            >
                              <RadioButton
                                getType={Gender}
                                data={data}
                                setType={setGender}
                                disabled={true}
                              />
                            </div>
                          </Form.Group>
                          <Form.Group as={Col} md="6">
                            <div style={{ marginBottom: 12 }}>
                              <Trans i18nKey="Physically_Disabled">
                                {" "}
                                Physically Disabled{" "}
                              </Trans>
                            </div>
                            <div
                              style={{ flexDirection: "row", display: "flex" }}
                            >
                              <RadioButton
                                getType={PhysicallyDisabled}
                                data={data2}
                                setType={setPhysicallyDisabled}
                                disabled={true}
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
                            <Form.Label>
                              <Trans i18nKey="Date_of_birth">
                                {" "}
                                Date of birth{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Control
                              value={DOB}
                              onChange={setDOB}
                              disabled
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

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom04"
                          >
                            <Form.Label>
                              <Trans i18nKey="Visit_Status">
                                {" "}
                                Visit Status{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Control value={visitorstatus} disabled />

                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Select_visit_status">
                                {" "}
                                Select visit status{" "}
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
                              <Trans i18nKey="Vidhansabha"> Vidhansabha </Trans>
                            </Form.Label>
                            <Form.Control value={vidhansabhaName} disabled />

                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Select_Vidhansabha">
                                {" "}
                                Select vidhansabha{" "}
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
                            <Form.Control value={constituency} disabled />

                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Select_Constituency">
                                {" "}
                                Select relevant constituency{" "}
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
                              <Trans i18nKey="Mantralaya"> Mantralaya </Trans>
                            </Form.Label>
                            <Form.Control value={mantralayaName} disabled />

                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Select_Mantralaya">
                                {" "}
                                Select relevant mantralaya{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label>
                              <Trans i18nKey="Reference"> Reference </Trans>
                            </Form.Label>
                            <Form.Control value={refrence} disabled />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Enter_reference,_If_any!">
                                {" "}
                                Enter reference, If any!{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom02"
                          >
                            <Form.Label>
                              <Trans i18nKey="Reason_to_visit">
                                {" "}
                                Reason to visit{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={reasonVisit}
                              disabled
                            />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Please_enter_reason_to_visit">
                                {" "}
                                Please enter reason to visit{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationCustom01"
                          >
                            <Form.Label>
                              <Trans i18nKey="group_member_name">
                                {" "}
                                Group Member Name{" "}
                              </Trans>
                            </Form.Label>
                            <Form.Control value={getGroupName} disabled />
                            <Form.Control.Feedback>
                              <Trans i18nKey="look_good"> Looks good! </Trans>
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              <Trans i18nKey="Enter_reference,_If_any!">
                                {" "}
                                Enter Group Name, If any!{" "}
                              </Trans>
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <div
                            className="col-6"
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              width: 120,
                            }}
                          >
                            <div className="position-relative">
                              <img
                                // src={`${ServerURL}/images/${picture}`}
                                src={picture}
                                alt=""
                                height={100}
                                class="img-fluid avatar rounded-circle"
                                // style={{ marginTop: 5 }}
                              />
                            </div>
                          </div>
                        </Row>
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
