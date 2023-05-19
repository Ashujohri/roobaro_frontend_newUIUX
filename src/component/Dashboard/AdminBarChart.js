import React, { useState, useEffect } from "react";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel } from "victory";
import { getDataAxios } from "../Services/NodeServices";
import Swal from "sweetalert2";
import moment from "moment";
import "../BarchartCss.css";

export default function AdminBarChart(props) {
  var UserData = JSON.parse(localStorage.getItem("userData"));
  const [getBarChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchBarChartData();
  }, []);

  // API calling for Bar Chart Graph in Dashboard
  const fetchBarChartData = async () => {
    try {
      let result = await getDataAxios(
        `admin/dashboardBarChartfilterVisitTimeline/${UserData.minister_id}/undefined/undefined`
      );
      if (result?.status === true) {
        if (result.data.length != 0) {
          setBarChartData(result.data);
        } else {
          setBarChartData(0);
        }
      } else {
        Swal.fire({
          icon: "error",
          text: `${result.message}`,
        });
      }
    } catch (error) {
      console.log("error in catch bar charts 🔥🔥🔥🔥", error);
    }
  };

  // API calling for Bar charts filter in dashboard
  const fetchBarChartFilterData = async (startDateParam, endDateParam) => {
    try {
      let result = await getDataAxios(
        `admin/dashboardBarChartfilterVisitTimeline/${UserData.minister_id}/${startDateParam}/${endDateParam}`
      );
      if (result?.status === true) {
        if (result.data.length != 0) {
          setBarChartData(result.data);
        } else {
          setBarChartData(0);
        }
      } else {
        Swal.fire({
          icon: "error",
          text: `${result.message}`,
        });
      }
    } catch (error) {
      console.log("error in catch bar chart filter", error);
    }
  };

  return (
    <div
      style={{
        width: "90%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: 15,
        display: "flex",
        flexDirection: "column",
        margin: 20 /* background:'red' */,
      }}
    >
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <div
          style={{
            textAlign: "left",
            paddingLeft: 10,
            // fontFamily: "Poppins",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Visitors trend
        </div>
        <div style={{ paddingRight: 10 }}>
          <div className="dropdown float-end">
            <a
              href={false}
              className="dropdown-toggle arrow-none card-drop"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <button
                type="button"
                class="btn btn-info btn-sm"
                style={{
                  borderRadius: 12,
                  height: 28,
                  backgroundColor: "#005db6",
                }}
              >
                <i class="mdi mdi-filter"></i> Filter
              </button>
            </a>
            <div
              className="dropdown-menu dropdown-menu-end"
              style={{
                cursor: "pointer",
                backgroundColor: "#005db6",
                color: "white",
                borderRadius: 18,
              }}
            >
              {/* item*/}
              <div
                href="javascript:void(0);"
                className="dropdown-item"
                style={{ color: "black", fontWeight: 650 }}
                onClick={() =>
                  fetchBarChartFilterData(
                    moment()
                      .subtract(1, "months")
                      .startOf("month")
                      .format("YYYY-MM-DD hh:mm:ss"),
                    moment()
                      .subtract(1, "months")
                      .endOf("month")
                      .format("YYYY-MM-DD hh:mm:ss")
                  )
                }
              >
                1 month
              </div>
              {/* item*/}
              <div
                href="javascript:void(0);"
                className="dropdown-item"
                style={{ color: "black", fontWeight: 650 }}
                onClick={() =>
                  fetchBarChartFilterData(
                    moment()
                      .subtract(3, "months")
                      .format("YYYY-MM-DD hh:mm:ss"),
                    moment().format("YYYY-MM-DD hh:mm:ss")
                  )
                }
              >
                3 month
              </div>
              {/* item*/}
              <div
                href="javascript:void(0);"
                className="dropdown-item"
                style={{ color: "black", fontWeight: 650 }}
                onClick={() =>
                  fetchBarChartFilterData(
                    moment()
                      .subtract(6, "months")
                      .format("YYYY-MM-DD hh:mm:ss"),
                    moment().format("YYYY-MM-DD hh:mm:ss")
                  )
                }
              >
                6 month
              </div>
            </div>
          </div>
        </div>
      </div>
      <VictoryChart
        width={1200}
        padding={65}
        responsive={true}
        animate={{
          duration: 500,
          onLoad: { duration: 200 },
        }}
        barRatio={1}
        domainPadding={20}
        theme={VictoryTheme.material}
      >
        <VictoryBar
          barRatio={1}
          cornerRadius={12} // Having this be a non-zero number looks good when it isn't transitioning, but looks like garbage when it is....
          style={{ data: { fill: "#f47216", width: 40 } }}
          alignment="middle"
          data={getBarChartData}
          x="x"
          y="y"
          labelComponent={<VictoryLabel dy={20} />}
        />
      </VictoryChart>
    </div>
  );
}
