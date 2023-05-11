import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ListItem(props) {
  const navigate = useNavigate();
  var fetchLocal = JSON.parse(localStorage.getItem("roleName"));
  var userData = JSON.parse(localStorage.getItem("userData"));

  // useEffect(() => {
  //   chkToken();
  // }, []);

  // const chkToken = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/AdminLogin", { replace: true });
  //   } else {
  //     navigate("/dashboard", { replace: true });
  //   }
  // };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/AdminLogin", { replace: true });
  };

  const handleRoute = (data) => {
    navigate(`/${data}`);
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

              {fetchLocal.includes("super_admin") == true ? (
                <li>
                  <a
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleRoute("minister")}
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

              {fetchLocal.includes("super_admin") == true ? (
                <li>
                  <a
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleRoute("localization")}
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

              {fetchLocal.includes("super_admin") == true ? (
                <li>
                  <a
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleRoute("minister")}
                  >
                    {<i className="fe-users" style={{ fontSize: 18 }} />}
                    <span
                      style={{
                        padding: 10,
                      }}
                    >
                      Ministers
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
                  onClick={() => handleRoute("users")}
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

              <li>
                <a
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => handleRoute("visitors")}
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

              {/* <li>
                <a
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => handleRoute("appoinments")}
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
              </li> */}

              {fetchLocal.includes("super_admin") == true ? (
                <li>
                  <a
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleRoute("myprofile")}
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

              <li>
                <a
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  // onClick={false}
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

              <li>
                <a
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => handleLogout()}
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

  return (
    <>
      <div className="left-side-menu">
        <div className="h-100" data-simplebar="">
          <div className="user-box text-center">
            <img
              src="images/users/user-11.jpg"
              // alt="user-1"
              // title="Mat Helme"
              className="rounded-circle img-thumbnail avatar-lg"
              width={50}
            />
            <div className="dropdown">
              <a
                href="#"
                className="user-name dropdown-toggle h5 mt-2 mb-1 d-block"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "#0661b8" }}
              >
                {userData != null ? userData.MinisterName : null}
              </a>
              <div className="text-muted">
                Admin
                {/* <Modal setTitle={setTitle}>{title}</Modal> */}
              </div>
            </div>
          </div>
          {/*- Sidemenu */}
          {showSideMenu()}

          <div className="clearfix" />
        </div>
      </div>
    </>
  );
}
