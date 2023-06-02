import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserModal from "../Models/DashboardUserModel";
import Modal from "react-bootstrap/Modal";
import { getDataAxios, postDataAxios } from "../Services/NodeServices";
import Swal from "sweetalert2";
import { Trans, useTranslation } from "react-i18next";
import moment from "moment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Model from "@mui/material/Modal";
import logo from "../../images/app.gif";
import SucessModel from "./SucessModel";
import "../style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  height: 400,
  borderRadius: 5,
  bgcolor: "background.paper",
  p: 4,
};

export default function ListItem(props) {
  var fetchLocal = JSON.parse(localStorage.getItem("roleName"));
  var userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [getChecked, setChecked] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [getLanguageData, setLanguageData] = useState([]);
  const [getOpen, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [fileNameShow, setFileNameShow] = useState(false);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    // chkToken();
    fetchLanguages();
    fetchUserLanguage();
  }, [props]);

  // const chkToken = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/AdminLogin", { replace: true });
  //   } else {
  //     navigate("/dashboard", { replace: true });
  //   }
  // };

  const fetchUserLanguage = async () => {
    try {
      let result = await getDataAxios(`users/fetchUserDetail/${userData.id}`);
      // console.log("result in userLang", result);
      if (result.status === true) {
        const data = result.result.map((item) => item.language_id);
        setChecked(data);
      }
    } catch (error) {
      console.log("error in catch in ListItem", error);
    }
  };
  const fetchLanguages = async () => {
    try {
      let result = await getDataAxios(`language/displayLanguage`);
      if (result.status === true) {
        setLanguageData(result.result);
      } else {
        Swal.fire({ icon: "error", text: `${result.message}` });
      }
    } catch (error) {
      console.log("error in catch language", error);
    }
  };

  const handleLogout = () => {
    // localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("roleName");
    localStorage.removeItem("userData");
    navigate("/AdminLogin", { replace: true });
  };

  const handleRoute = (data) => {
    navigate(`/${data}`);
  };

  const handleClose = () => {
    setShow(false);
    setIsHover(false);
    setOpen(false);
  };

  const handleOpen = () => {
    console.log("hiii");
    setOpen(true);
    setSuccessOpen(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const triggerValidation = (event) => {
    var rr = event;
    var lastFive = rr.substr(rr.length - 4);
    if (".csv" == lastFive) {
      setFileNameShow(true);
    } else {
      setFileError("This file format is not acceptable");
      setFileNameShow(false);
    }
  };

  const changeLanguage = async (lang) => {
    localStorage.setItem("language", lang);
    let langString = "";
    try {
      let body = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        mobile_number: userData.mobile_number,
        status: userData.status,
        minister_id: userData.minister_id,
        created_at: moment(userData.created_at).format("YYYY-MM-DD HH:mm:ss"),
        role_id: userData.role_id,
        language_id: lang,
        user_address: userData.user_address,
        user_organization: userData.user_organization,
        user_location: userData.user_location,
        picture: userData.picture,
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      let result = await postDataAxios(`users/updateUser/${userData.id}`, body);
      if (result.status === true) {
        if (lang == 2) {
          langString = "Hindi";
        } else if (lang == 3) {
          langString = "Gujrati";
        } else if (lang == 4) {
          langString = "Marathi";
        } else if (lang == 5) {
          langString = "Punjabi";
        } else if (lang == 7) {
          langString = "Tamil";
        } else if (lang == 8) {
          langString = "Telegu";
        } else {
          langString = "English";
        }
        i18n.changeLanguage(`${langString}`);
        Swal.fire({ icon: "success", text: "Language Changed" });
        handleClose();
      } else {
        Swal.fire({ icon: "error", text: result.message });
      }
    } catch (error) {
      console.log("error in catch changeLan", error);
    }
  };

  const showLanguages = () => {
    return getLanguageData.map((item, index) => {
      const checked = getChecked.includes(item.id);
      return (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: "32.5%",
            marginBottom: "1%",
            height: 60,
            borderRadius: 10,
            border: "1px solid #005DB6",
            backgroundColor: getChecked === "" ? "#F3F8FF" : "#FFF",
            color: isHover ? "#005DB6" : "#005DB6",
            padding: 5,
          }}
        >
          <div style={{ marginLeft: 20, marginTop: 10 }}>
            <input
              style={{ cursor: "pointer" }}
              type="checkbox"
              value={item.id}
              // id={item.id}
              checked={checked}
              onChange={(event) => {
                setChecked(event.target.value);
                changeLanguage(event.target.value);
              }}
            />
            <label
              style={{
                marginLeft: "5px",
                color: "#005DB6",
                fontWeight: "bold",
              }}
            >
              {item.language_name}
            </label>
            <div
              style={{
                fontSize: "12px",
                marginLeft: "24px",
                color: "black",
                fontWeight: 500,
              }}
            >
              {item.language_name}
            </div>
          </div>
        </div>
      );
    });
  };

  const showSideMenu = () => {
    return (
      <>
        <div id="sidebar-menu">
          <ul id="side-menu" style={{ padding: 20 }}>
            <div style={{ width: "80%", marginRight: 0 }}>
              <li>
                <a
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => handleRoute("dashboard")}
                  href={false}
                >
                  {<i className="fe-home" style={{ fontSize: 18 }} />}
                  <span
                    style={{
                      padding: 10,
                    }}
                  >
                    {/* Dashboard */}
                    <Trans i18nKey="Dashboard">Dashboard</Trans>
                  </span>
                </a>
              </li>

              {fetchLocal.includes("super_admin") === true ? (
                <li>
                  <a
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleRoute("minister")}
                    href={false}
                  >
                    {<i className="fe-users" style={{ fontSize: 18 }} />}
                    <span
                      style={{
                        padding: 10,
                      }}
                    >
                      {/* Minister */}
                      <Trans i18nKey="Ministers">Ministers</Trans>
                    </span>
                  </a>
                </li>
              ) : null}

              {fetchLocal.includes("super_admin") === true ? (
                <li style={{ marginBottom: 8, marginTop: 8 }}>
                  <a
                    href="#language"
                    data-bs-toggle="collapse"
                    style={{ color: "currentcolor" }}
                  >
                    <i
                      className="mdi mdi-clipboard-list-outline"
                      style={{ fontSize: 18 }}
                    />
                    <span style={{ padding: 10 }}>
                      {" "}
                      <Trans i18nKey="localization"> Localization </Trans>{" "}
                    </span>
                    <span style={{ padding: 4 }} className="menu-arrow" />
                  </a>
                  <div className="collapse" id="language">
                    <ul
                      className="nav-second-level"
                      style={{ cursor: "pointer" }}
                    >
                      <li>
                        <a
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={() => handleRoute("languages")}
                          href={false}
                        >
                          <Trans i18nKey="Language"> Languages </Trans>
                        </a>
                      </li>
                    </ul>

                    <ul
                      className="nav-second-level"
                      style={{ cursor: "pointer" }}
                    >
                      <li>
                        <a
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={() => handleRoute("AllLabels")}
                          href={false}
                        >
                          Label
                        </a>
                      </li>
                    </ul>

                    <ul
                      className="nav-second-level"
                      style={{ cursor: "pointer" }}
                    >
                      <li>
                        <a
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={() => handleRoute("labelTranslation")}
                          href={false}
                        >
                          <Trans i18nKey="label_translations">
                            {" "}
                            Label Translations{" "}
                          </Trans>
                        </a>
                      </li>
                    </ul>

                    <ul
                      className="nav-second-level"
                      style={{ cursor: "pointer" }}
                    >
                      <li>
                        <a
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={() => handleRoute("getAllURLs")}
                          href={false}
                        >
                          Localization URL's
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : null}

              {fetchLocal.includes("super_admin") === true ||
              fetchLocal.includes("minister") === true ? (
                <li>
                  <a
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: "currentcolor",
                    }}
                    onClick={() => handleRoute("users")}
                    href={false}
                  >
                    {<i className="fe-users" style={{ fontSize: 18 }} />}
                    <span
                      style={{
                        padding: 10,
                      }}
                    >
                      {/* Users */}
                      <Trans i18nKey="User">Users</Trans>
                    </span>
                  </a>
                </li>
              ) : null}

              {fetchLocal.includes("super_admin") === true ||
              fetchLocal.includes("minister") === true ? (
                <li>
                  <a
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleRoute("visitors")}
                    href={false}
                  >
                    {
                      <i
                        className="mdi mdi-clipboard-list-outline"
                        style={{ fontSize: 18 }}
                      />
                    }
                    <span
                      style={{
                        padding: 10,
                      }}
                    >
                      {/* Visits */}
                      <Trans i18nKey="Visits">Visits</Trans>
                    </span>
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleRoute("userDashVisitor")}
                    href={false}
                  >
                    {
                      <i
                        className="mdi mdi-clipboard-list-outline"
                        style={{ fontSize: 18 }}
                      />
                    }
                    <span
                      style={{
                        padding: 10,
                      }}
                    >
                      {/* Visits */}
                      <Trans i18nKey="Visits">Visitors</Trans>
                    </span>
                  </a>
                </li>
              )}

              {/* || */}
              {/* fetchLocal.includes("user_staff") */}

              {fetchLocal.includes("super_admin") === true ||
              fetchLocal.includes("minister") === true ? (
                <li>
                  <a
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handleOpen}
                    href={false}
                  >
                    {<i className="fe-calendar" style={{ fontSize: 18 }} />}
                    <span
                      style={{
                        padding: 10,
                      }}
                    >
                      <Trans i18nKey="Appoinments"> Appoinments </Trans>
                    </span>
                  </a>
                </li>
              ) : null}

              {fetchLocal.includes("super_admin") === true ||
              fetchLocal.includes("user_staff") ? (
                <li>
                  <a
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleRoute("myprofile")}
                    href={false}
                  >
                    {<i className="fe-users" style={{ fontSize: 18 }} />}
                    <span
                      style={{
                        padding: 10,
                      }}
                    >
                      <Trans i18nKey="My_Profile"> My Profile </Trans>
                    </span>
                  </a>
                </li>
              ) : null}

              {/* {fetchLocal.includes("super_admin") === true ||
              fetchLocal.includes("user_staff") ? ( */}
              <li>
                <a
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={handleShow}
                  href={false}
                >
                  {
                    <i
                      className="mdi mdi-clipboard-list-outline"
                      style={{ fontSize: 18 }}
                    />
                  }
                  <span
                    style={{
                      padding: 10,
                    }}
                  >
                    <Trans i18nKey="Change_Language"> Change Language </Trans>
                  </span>
                </a>
              </li>
              {/* ) : null} */}

              <li>
                <a
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => handleLogout()}
                  href={false}
                >
                  {<i className="fe-log-out" style={{ fontSize: 18 }} />}
                  <span
                    style={{
                      padding: 10,
                    }}
                  >
                    <Trans i18nKey="logout"> Logout </Trans>
                  </span>
                </a>
              </li>
            </div>
          </ul>
        </div>
      </>
    );
  };

  const showChangeModel = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <Trans i18nKey="Change_Language"> Change Language </Trans>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                // margin:5,
                // padding:5
                width: "100%",
              }}
            >
              {showLanguages()}
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  const showAppointmentModel = () => {
    return (
      <>
        <Model
          open={getOpen}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img style={{ width: "55%" }} src={logo} />
            </div>

            <div
              style={{
                fontSize: 16,
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
                color: "black",
              }}
            >
              <Trans i18nKey="Appoinment_Schedule"> Appoinment Schedule </Trans>
            </div>

            <div
              style={{
                fontSize: 12,
                margin: 10,
                width: "58%",
                marginTop: "9%",
              }}
            >
              <Trans i18nKey="Upload_Appoinments"> Upload Appoinments </Trans>
              <Button
                style={{
                  fontFamily: "Poppins",
                  color: "#90979f",
                  fontWeight: 600,
                  fontSize: 14,
                  border: 2,
                  marginTop: 2,
                  width: 250,
                  marginRight: 100,
                }}
                variant="outlined"
              >
                <input
                  accept=".csv"
                  name="uploadDocument"
                  multiple
                  type="file"
                  id="choose-file"
                  onChange={(event) => {
                    triggerValidation(event.target.value);
                  }}
                />
              </Button>
              <div
                style={{ fontSize: 12, width: "80%", fontFamily: "cursive" }}
              >
                <Trans i18nKey="only_CSV_file_accepted">
                  {" "}
                  Only CSV File Accepted{" "}
                </Trans>
              </div>
              <div
                style={{
                  fontSize: 12,
                  width: 200,
                  fontFamily: "cursive",
                  background: "pink",
                  color: "red",
                }}
              >
                {fileNameShow == false && fileError}
              </div>
            </div>

            <div style={{ marginLeft: "30%", marginTop: 15 }}>
              <Button
                disabled={fileNameShow == true ? false : true}
                style={{
                  backgroundColor: "#e67e22",
                  color: "#fff",
                  width: 17,
                  height: 30,
                  fontSize: 10,
                }}
                // onClick={handleOpen}
              >
                <Trans i18nKey="Submit"> Submit </Trans>
              </Button>
              <Button
                style={{
                  backgroundColor: "grey",
                  color: "#fff",
                  width: 17,
                  height: 30,
                  marginLeft: 4,
                  fontSize: 10,
                }}
                onClick={handleClose}
              >
                <Trans i18nKey="Cancel"> Cancel </Trans>
              </Button>
            </div>
          </Box>
        </Model>
        <SucessModel setOpen={setSuccessOpen} open={successOpen} />
      </>
    );
  };

  return (
    <>
      <div className="left-side-menu">
        <div className="h-100" data-simplebar="">
          <div className="user-box text-center">
            <img
              alt="img"
              src="images/users/user-11.jpg"
              className="rounded-circle img-thumbnail avatar-lg"
              width={50}
            />
            <div className="dropdown">
              <a
                href={false}
                className="user-name dropdown-toggle h5 mt-2 mb-1 d-block"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "#0661b8" }}
              >
                {fetchLocal.includes("minister") === true && userData != null
                  ? userData.MinisterName
                  : userData.firstname + " " + userData.lastname}
              </a>
              <div className="text-muted">
                {fetchLocal.includes("super_admin") === true ? (
                  <Trans i18nKey="super_admin"> Super Admin </Trans>
                ) : fetchLocal.includes("minister") === true ? (
                  <Trans i18nKey="Admin"> Admin </Trans>
                ) : (
                  <UserModal>{title}</UserModal>
                )}
              </div>
            </div>
          </div>
          {/*- Sidemenu */}
          {showSideMenu()}

          <div className="clearfix" />
        </div>
        <div className="content-page">
          <div>{showChangeModel()}</div>
          <div>{showAppointmentModel()}</div>
        </div>
      </div>
    </>
  );
}
