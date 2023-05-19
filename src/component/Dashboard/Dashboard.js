import React, { useEffect, useState } from "react";
import Topbar from "../Header/Topbar";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";
import AdminBarChart from "./AdminBarChart";
import AdminVidhanSabhaProgressBar from "./AdminVidhanSabhaProgressBar";
import AdminEngageProgressBar from "./AdminEngageProgressBar";
import AdminVisitorStatusType from "./AdminVisitorStatusType";

export default function Dashboard(props) {
  const navigate = useNavigate();
  var fetchLocal = JSON.parse(localStorage.getItem("roleName"));
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
            <AdminBarChart />
            <AdminVisitorStatusType />
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
