import React from "react";
import Barchart from "../Pages/Charts/Barchart";
import ProgressBar from "../Pages/Charts/ProgressBar";
import Progress from "../Pages/Charts/progress";
import PieCharts from "../Pages/Charts/PieChart";

export default function Dashboard360(props) {
  return (
    <div>
      {/* <Modal/> */}
      <Barchart width={915} />
      <div style={{ display: "flex", flexDirection: "row", color: "#005db6" }}>
        <ProgressBar
          pathColor="#49dc66 "
          trailColor="#14a231"
          text="1456 total visitors"
          title="Vidhansabha Segments"
          data="50%"
          value={30}
        />
        <ProgressBar
          pathColor="#2a86df "
          trailColor="#005db6"
          text="1456 total visitors"
          title="Total Engagement Time"
          data="20%"
          value={70}
        />{" "}
        <PieCharts width={260} height={260} />
      </div>
    </div>
  );
}
