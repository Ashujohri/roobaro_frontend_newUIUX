import React, { useState } from "react";
import Topbar from "../../Header/Topbar";
import ListItem from "../../Dashboard/ListItem";
import UserVisitorTable from "../User/UserVisitorTable";

export default function UserDashVisitor(props) {
  var userDetail = JSON.parse(localStorage.getItem("userData"));
  const [getShowName, setShowName] = useState("Visitors");

  return (
    <div id="wrapper">
      <Topbar showName={getShowName} />
      <ListItem />
      <div class="content-page">
        <UserVisitorTable userDetail={userDetail} />
      </div>
    </div>
  );
}
