import React, { useEffect, useState } from "react";
import Topbar from "../Header/Topbar";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";
import { getDataAxios } from "../Services/NodeServices";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PieChart } from "react-minimal-pie-chart";
import {
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
  VictoryLabel,
  VictoryGroup,
  VictoryAxis,
  VictoryBrushLine,
} from "victory";
// Styles sets a 500 max-width on the root container div for the app.
import "../BarchartCss.css";

export default function Dashboard(props) {
  const navigate = useNavigate();
  var UserData = JSON.parse(localStorage.getItem("userData"));
  const [getData, setData] = useState([]);

  const data = [
    { title: "One", value: 20, color: "#ff393a" },
    { title: "Two", value: 15, color: "#ff7e24" },
  ];

  useEffect(() => {
    chkToken();
    fetchVidhanSabhaData();
  }, []);

  const chkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/AdminLogin", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  const fetchVidhanSabhaData = async () => {
    try {
      const result = await getDataAxios(
        `vidhansabha/displayVidhansabha/${UserData.StateId}`
      );
      setData(result.result);
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const showDropdown = () => {
    return getData.map((item) => {
      return (
        <div
          href="javascript:void(0);"
          className="dropdown-item"
          style={{ color: "black" }}
          // onClick={() => handleLastMonthFilter()}
        >
          {item.vidhansabha_name}
        </div>
      );
    });
  };

  return (
    <>
      <div id="wrapper">
        <Topbar />
        <ListItem />
        <div className="content-page">
          {/* BarCharts */}
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
                  fontFamily: "Poppins",
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
                      style={{ color: "black" }}
                      // onClick={() => handleFilter()}
                    >
                      1 month
                    </div>
                    {/* item*/}
                    <div
                      href="javascript:void(0);"
                      className="dropdown-item"
                      style={{ color: "black" }}
                      // onClick={() => handleLastMonthFilter()}
                    >
                      3 month
                    </div>
                    {/* item*/}
                    <div
                      href="javascript:void(0);"
                      className="dropdown-item"
                      style={{ color: "black" }}
                      // onClick={() => handleLast3MonthFilter()}
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
              <VictoryAxis
                tickValues={[1, 2, 3, 4, 5, 6]}
                tickFormat={[
                  "Jan",
                  "Feb",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ]}
              />
              <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1000}`} />
              <VictoryBar
                barRatio={1}
                // barWidth={({ index }) => index * 3 + 30}
                cornerRadius={12} // Having this be a non-zero number looks good when it isn't transitioning, but looks like garbage when it is....
                style={{ data: { fill: "#f47216", width: 40 } }}
                alignment="middle"
                // labels={d => d.x}
                data={[
                  { Year: "Jan", earning: 4500000 },
                  { Year: "Feb", earning: 2500000 },
                  { Year: "March", earning: 5000000 },
                  { Year: "April", earning: 7500000 },
                  { Year: "May", earning: 1000000 },
                  { Year: "June", earning: 1400000 },
                  { Year: "July", earning: 1700000 },
                  { Year: "Aug", earning: 1900000 },
                  { Year: "Sep", earning: 2200000 },
                  { Year: "Oct", earning: 2400000 },
                  { Year: "Nov", earning: 2600000 },
                  { Year: "Dec", earning: 3000000 },
                ]}
                x="Year"
                y="earning"
                labelComponent={<VictoryLabel dy={20} />}
              />
            </VictoryChart>
          </div>
          {/* EndBarcharts */}
          <div
            style={{ display: "flex", flexDirection: "row", color: "#005db6" }}
          >
            {/* ProgressBar */}
            <div
              style={{
                width: 260,
                height: 260,
                backgroundColor: "white",
                borderRadius: 15,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                margin: 15,
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  paddingLeft: 20,
                  fontFamily: "Poppins",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Vidhansabha Segments
              </div>

              <div
                style={{
                  width: 130,
                  height: 140,
                  alignSelf: "center",
                  // trailColor: "#d6d6d6",
                  marginTop: 20,
                  position: "relative",
                }}
              >
                <CircularProgressbarWithChildren
                  value={30}
                  strokeWidth={14}
                  styles={buildStyles({
                    pathColor: "#49dc66",
                    textColor: "#005db6",
                    trailColor: "#14a231",
                  })}
                  title="Vidhansabha Segments"
                >
                  <div style={{ flexDirection: "column" }}>
                    <div
                      style={{
                        fontSize: 12,
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      50%
                    </div>
                    <div style={{ fontSize: 10 }}>1456 total visitors</div>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <div
                class="col-12 col-md-12"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: 0,
                }}
              >
                <div class="row">
                  <div>
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
                          <i class="mdi mdi-city-variant-outline" />
                          VidhanSabha &nbsp;
                          <i class="mdi mdi-arrow-down-drop-circle-outline" />
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
                        {showDropdown()}
                      </div>
                    </div>
                  </div>
                </div>

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
                        backgroundColor: "#ff7e24",
                      }}
                    >
                      <i class="mdi mdi-filter"></i> Filter
                    </button>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#ff7e24",
                      borderRadius: 18,
                    }}
                  >
                    <div
                      href="javascript:void(0);"
                      className="dropdown-item"
                      // onClick={() => handleLastMonthFilter()}
                    >
                      3 month
                    </div>
                    {/* item*/}
                    <div
                      href="javascript:void(0);"
                      className="dropdown-item"
                      // onClick={() => handleLast3MonthFilter()}
                    >
                      6 month
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* EndProgressBar */}

            {/* ProgressBar Second */}
            <div
              style={{
                width: 260,
                height: 260,
                backgroundColor: "white",
                borderRadius: 15,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                margin: 15,
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  paddingLeft: 20,
                  fontFamily: "Poppins",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Total Engagement Time
              </div>

              <div
                style={{
                  width: 130,
                  height: 140,
                  alignSelf: "center",
                  // trailColor: "#d6d6d6",
                  marginTop: 20,
                  position: "relative",
                }}
              >
                <CircularProgressbarWithChildren
                  value={70}
                  strokeWidth={14}
                  styles={buildStyles({
                    pathColor: "#2a86df",
                    textColor: "#005db6",
                    trailColor: "#005db6",
                  })}
                >
                  <div style={{ flexDirection: "column" }}>
                    <div
                      style={{
                        fontSize: 12,
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      20%
                    </div>
                    <div style={{ fontSize: 10 }}>1456 total visitors</div>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <div
                class="col-12 col-md-12"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: 0,
                }}
              >
                <div class="row">
                  <div>
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
                          <i class="mdi mdi-city-variant-outline" />
                          VidhanSabha &nbsp;
                          <i class="mdi mdi-arrow-down-drop-circle-outline" />
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
                        {showDropdown()}
                      </div>
                    </div>
                  </div>
                </div>

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
                        backgroundColor: "#ff7e24",
                      }}
                    >
                      <i class="mdi mdi-filter"></i> Filter
                    </button>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#ff7e24",
                      borderRadius: 18,
                    }}
                  >
                    <div
                      href="javascript:void(0);"
                      className="dropdown-item"
                      // onClick={() => handleLastMonthFilter()}
                    >
                      3 month
                    </div>
                    {/* item*/}
                    <div
                      href="javascript:void(0);"
                      className="dropdown-item"
                      // onClick={() => handleLast3MonthFilter()}
                    >
                      6 month
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End ProgressBar Second */}

            {/* Pie Chart */}
            <div
              style={{
                width: 260,
                height: 260,
                backgroundColor: "white",
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                margin: 15,
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
                    fontFamily: "Poppins",
                    color: "black",
                    fontWeight: 800,
                  }}
                >
                  Visit Type
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
                        borderRadius: 18,
                      }}
                    >
                      {/* item*/}
                      <div
                        href="javascript:void(0);"
                        className="dropdown-item"
                        style={{ color: "black" }}
                        // onClick={() => handleFilter()}
                      >
                        1 month
                      </div>
                      {/* item*/}
                      <div
                        href="javascript:void(0);"
                        className="dropdown-item"
                        style={{ color: "black" }}
                        // onClick={() => handleLastMonthFilter()}
                      >
                        3 month
                      </div>
                      {/* item*/}
                      <div
                        href="javascript:void(0);"
                        className="dropdown-item"
                        style={{ color: "black" }}
                        // onClick={() => handleLast3MonthFilter()}
                      >
                        6 month
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 200,
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 150, height: 150 }}>
                  <PieChart
                    data={data}
                    label={({ dataEntry }) => {
                      return `${Math.round(dataEntry.percentage)}% `;
                    }}
                    labelStyle={{ fontSize: "6px", fontFamily: "sans-serif" }}
                    labelPosition={45}
                    paddingAngle={0}
                    radius={50}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    background: "#ff393a",
                    margin: 10,
                  }}
                />
                <span>Single</span>

                <div
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    background: "#ff7e24",
                    margin: 10,
                  }}
                />
                <span> Group</span>
              </div>
            </div>
            {/* End Pie Chart */}
          </div>
        </div>
      </div>
    </>
  );
}
