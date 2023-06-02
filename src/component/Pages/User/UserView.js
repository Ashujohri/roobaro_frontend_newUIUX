import React, { useState, useEffect } from "react";
import Topbar from "../../Header/Topbar";
import ListItem from "../../Dashboard/ListItem";
import { useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import UserBarChart from "./UserBarChart";
import UserPieChart from "./UserPieChart";
import UserVisitorTable from "./UserVisitorTable";

export default function UserView(props) {
  const location = useLocation();
  const [getShowName, setShowName] = useState("User Detail");
  const userDetail = location.state.item;

  useEffect(() => {
    // chkToken();
  }, []);

  // const chkToken = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/AdminLogin", { replace: true });
  //   } else {
  //     navigate("/users", { replace: true });
  //   }
  // };

  return (
    <div id="wrapper">
      <Topbar showName={getShowName} />
      <ListItem />
      <div class="content-page">
        <UserProfile userDetail={userDetail} />
        <div className="row">
          <UserBarChart userDetail={userDetail} />
          <div style={{ width: "30%", height: "20%" }}>
            <UserPieChart userDetail={userDetail} />
          </div>
        </div>
        <UserVisitorTable userDetail={userDetail} />
      </div>
    </div>
  );
}
