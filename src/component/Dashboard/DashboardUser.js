import React from "react";
import Barchart from "../Pages/Charts/Barchart";
import ProgressBar from "../Pages/Charts/ProgressBar";
import Progress from "../Pages/Charts/progress";
import PieCharts from "../Pages/Charts/PieChart";
import ListItem from "./ListItem";
import Topbar from "../Header/Topbar";
import "../../index.css";

export default function DashboardUser() {
  return (
    <div style={{}}>
      <Topbar />
      <ListItem />
      <div style={{ marginLeft: "10%" }}>
        <Barchart width={915} />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ProgressBar />
        <Progress />
        <PieCharts width={280} height={270} />
      </div>
    </div>
  );
}
