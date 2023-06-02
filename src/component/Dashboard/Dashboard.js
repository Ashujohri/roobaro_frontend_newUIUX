import React, { useEffect, useState } from "react";
import Topbar from "../Header/Topbar";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";
import AdminBarChart from "./AdminBarChart";
import AdminVidhanSabhaProgressBar from "./AdminVidhanSabhaProgressBar";
import AdminEngageProgressBar from "./AdminEngageProgressBar";
import AdminVisitorStatusType from "./AdminVisitorStatusType";
import UserBarChart from "../Pages/User/UserBarChart";
import UserPieChart from "../Pages/User/UserPieChart";

export default function Dashboard(props) {
  const navigate = useNavigate();
  var fetchLocal = JSON.parse(localStorage.getItem("roleName"));
  var userDetail = JSON.parse(localStorage.getItem("userData"));
  const [getShowName, setShowName] = useState("Dashboard");

  useEffect(() => {
    chkToken();
  }, []);

  // Check token function
  const chkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/AdminLogin", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <>
      <div id="wrapper">
        <Topbar showName={getShowName} />
        <ListItem />
        {fetchLocal.includes("user_staff") == true ? (
          <div className="content-page">
            <div className="row">
              <UserBarChart userDetail={userDetail} />
              <div style={{ width: "30%", height: "20%" }}>
                <UserPieChart userDetail={userDetail} />
              </div>
            </div>
          </div>
        ) : (
          <div className="content-page">
            <AdminBarChart />
            {/* EndBarcharts */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                color: "#005db6",
              }}
            >
              <AdminVidhanSabhaProgressBar />
              {/* EndProgressBar */}
              <AdminEngageProgressBar />
              {/* End ProgressBar Second */}
              <AdminVisitorStatusType />
              {/* End Pie Chart */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
