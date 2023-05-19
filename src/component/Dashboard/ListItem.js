import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserModal from "../Models/DashboardUserModel";
import Modal from "react-bootstrap/Modal";
import { getDataAxios } from "../Services/NodeServices";
import Swal from "sweetalert2";

export default function ListItem(props) {
  var fetchLocal = JSON.parse(localStorage.getItem("roleName"));
  var userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [getChecked, setChecked] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [getLanguageData, setLanguageData] = useState([]);

  useEffect(() => {
    // chkToken();
    fetchLanguages();
  }, [props]);

  // const chkToken = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/AdminLogin", { replace: true });
  //   } else {
  //     navigate("/dashboard", { replace: true });
  //   }
  // };

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
    localStorage.clear();
    navigate("/AdminLogin", { replace: true });
  };

  const handleRoute = (data) => {
    navigate(`/${data}`);
  };

  const handleClose = () => {
    setShow(false);
    setIsHover(false);
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

  const handleChecked = (event, cid) => {
    const { isChecked } = event.target;
    let id = cid;
    setChecked([...getChecked, id]);
    if (!isChecked) {
      console.log("getChecked", getChecked);
      setChecked(getChecked.filter((item) => item !== id));
    }
  };

  const handleSubmit = () => {
    console.log("getChecked", getChecked);
  };

  const showLanguages = () => {
    return getLanguageData.map((item, index) => {
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
            cursor: "pointer",
            backgroundColor: getChecked === "" ? "#F3F8FF" : "#FFF",
            color: isHover ? "#005DB6" : "#005DB6",
            // display: "flex",
            // flexWrap: "wrap",
          }}
        >
          <div style={{ marginLeft: 20, marginTop: 10 }}>
            <input
              type="checkbox"
              value={item.id}
              id={item.id}
              // checked={getChecked}
              // onChange={(event) => handleChecked(event, item.id)}
              onChange={(event) => setChecked(event.target.value)}
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
                    Dashboard
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
                      Minister
                    </span>
                  </a>
                </li>
              ) : null}

              {fetchLocal.includes("super_admin") === true ? (
                <li>
                  <a
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleRoute("localization")}
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
                      Localization
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
                    onClick={() => handleRoute("users")}
                    href={false}
                  >
                    {<i className="fe-users" style={{ fontSize: 18 }} />}
                    <span
                      style={{
                        padding: 10,
                      }}
                    >
                      Users
                    </span>
                  </a>
                </li>
              ) : null}

              {fetchLocal.includes("super_admin") === true ||
              fetchLocal.includes("minister") === true ||
              fetchLocal.includes("user_staff") ? (
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
                      Visits
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
                    onClick={() => handleRoute("appoinments")}
                    href={false}
                  >
                    {<i className="fe-calendar" style={{ fontSize: 18 }} />}
                    <span
                      style={{
                        padding: 10,
                      }}
                    >
                      Appoinments
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
                      My Profile
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
                      Change Language
                    </span>
                  </a>
                </li>
              ) : null}

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
                    Logout
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
          <Modal.Header
          // closeButton
          >
            <Modal.Title>Change Language</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {showLanguages()}
            </div>
          </Modal.Body>
          <div>
            <button className="btn btn-primary" onClick={() => handleSubmit()}>
              Apply
            </button>
          </div>
        </Modal>
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
                  "Super Admin"
                ) : fetchLocal.includes("minister") === true ? (
                  "Admin"
                ) : (
                  <UserModal setTitle={setTitle}>{title}</UserModal>
                )}
              </div>
            </div>
          </div>
          {/*- Sidemenu */}
          {showSideMenu()}

          <div className="clearfix" />
        </div>
        {showChangeModel()}
      </div>
    </>
  );
}
