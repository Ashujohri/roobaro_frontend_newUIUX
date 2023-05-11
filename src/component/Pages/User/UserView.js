import React, { useState, useEffect } from "react";
import Topbar from "../../Header/Topbar";
import ListItem from "../../Dashboard/ListItem";
import { useNavigate, useLocation } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";
import Dropdown from "../../Dropdown/dropdown";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
} from "victory";
import "../../BarchartCss.css";
import moment from "moment";
import { ServerURL, getDataAxios } from "../../Services/NodeServices";
import swal from "sweetalert";

export default function UserView(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [getAllVisits, setAllVisits] = useState([]);
  const [getAllUsersExcelDownload, setAllUsersExcelDownload] = useState([]);
  const [entryStart, setEntryStart] = useState(0);
  const [Page, setPage] = useState(1);
  const [entryEnd, setEntryEnd] = useState(10);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [getVisitTableData, setVistTableData] = useState([]);
  const [getGroupType, setGroupType] = useState([]);
  const [getSingleType, setSingleType] = useState([]);
  const [showOptions1, setShowOptions1] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [getShowName, setShowName] = useState("User Detail");
  const userDetail = location.state.item;

  const options1 = [
    { label: "1 months", id: 1 },
    { label: "3 months", id: 2 },
    { label: "6 months", id: 3 },
  ];

  useEffect(() => {
    // chkToken();
    fetchData();
  }, []);

  // const chkToken = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/AdminLogin", { replace: true });
  //   } else {
  //     navigate("/users", { replace: true });
  //   }
  // };
  const fetchData = async () => {
    try {
      let result = await getDataAxios(
        `visitors/visitorDetailTimeline/${userDetail.id}`
      );
      if (result.status == true) {
        setAllVisits(result.timeLineData);
        setGroupType(result.groupTypeData[0].groupPercent);
        setSingleType(result.singleTypeData[0].singlePercent);
      } else {
        swal({
          title: `${result.message}`,
          icon: "error",
          button: "ok",
        });
      }
    } catch (error) {
      console.log("error in user Detailview 🔥🔥🔥🔥🔥", error);
    }
  };

  const handleSearch = async (e) => {
    var searchArr = [];
    getVisitTableData.map((item) => {
      var id = `${item.id}`;
      if (id && id.includes(e.target.value)) {
        searchArr.push(item);
      }
    });
    setAllVisits(searchArr);
  };

  const sortTable = (n) => {
    let table,
      rows,
      switching,
      i,
      x,
      y,
      willSwitch,
      directory,
      switchCount = 0;
    table = document.getElementById("productTable");
    switching = true;
    directory = "ascending";

    while (switching) {
      switching = false;
      rows = table.rows;

      for (i = 1; i < rows.length - 1; i++) {
        willSwitch = false;

        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];

        if (directory === "ascending") {
          if (n === 0) {
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
              willSwitch = true;
              break;
            }
          } else if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            willSwitch = true;
            break;
          }
        } else if (directory === "descending") {
          if (n === 0) {
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
              willSwitch = true;
              break;
            }
          } else if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            willSwitch = true;
            break;
          }
        }
      }
      if (willSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;

        switchCount++;
      } else {
        if (switchCount === 0 && directory === "ascending") {
          directory = "descending";
          switching = true;
        }
      }
    }
  };

  const showEntry = (value) => {
    setEntryEnd(
      entryStart + value > getAllVisits.length
        ? getAllVisits.length
        : entryStart + value
    );
    setEntriesPerPage(value);
  };

  const getEmployee = (indOfRow) => {
    let c = [];
    if (getAllVisits.length > entriesPerPage) {
      for (let i = entryStart; i < entryEnd; i++) {
        c[i] = showEmployee(i);
      }
    } else {
      for (let i = 0; i < getAllVisits.length; i++) {
        c[i] = showEmployee(i);
      }
    }
    return c;
  };

  const handleViewPage = (item) => {};

  const showEmployee = (i) => {
    let ID = "";
    let visitorName = "";
    let mobileNumber = "";
    let visitorType = "";
    let vidhansabhaName = "";
    let createdDate = "";
    let AddedByName = "";
    try {
      ID = getAllVisits[i].id;
      visitorName = getAllVisits[i].firstname + " " + getAllVisits[i].lastname;
      mobileNumber = getAllVisits[i].mobile_number;
      visitorType = getAllVisits[i].visitor_type;
      vidhansabhaName = getAllVisits[i].VidhansabhaName;
      createdDate = moment(getAllVisits[i].created_at).format(
        "DD/MM/YYYY HH:mm:ss a"
      );
      AddedByName = getAllVisits[i].AddedBy;
    } catch (error) {
      ID = "";
      visitorName = "";
      mobileNumber = "";
      visitorType = "";
      vidhansabhaName = "";
      createdDate = "";
      AddedByName = "";
    }
    return (
      <tr>
        <td> {ID} </td>
        <td> {visitorName} </td>
        <td> {mobileNumber} </td>
        <td> {visitorType} </td>
        <td> {vidhansabhaName} </td>
        <td> {createdDate} </td>
        <td> {AddedByName} </td>
        <td>
          <button
            type="button"
            style={{
              borderRadius: 25,
              backgroundColor: "#23aed2",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => handleViewPage(getAllVisits[i])}
          >
            <i
              className="fe-eye"
              style={{ backgroundColor: "#22a6b3", color: "white" }}
            />
          </button>
        </td>
      </tr>
    );
  };
  const handlePageNumber = (entryNumber, value) => {
    let entNumber = value - 1;

    setEntryStart(entNumber * entriesPerPage);
    setEntryEnd(
      (entNumber + 1) * entriesPerPage < getAllVisits.length
        ? (entNumber + 1) * entriesPerPage
        : getAllVisits.length
    );
    setPage(value);
  };

  const NextFun = () => {
    return <div>Next</div>;
  };
  function BackFun() {
    return <div>Previous</div>;
  }

  const handlePaging = () => {
    let totalPages = getAllVisits.length / entriesPerPage;
    let CheckFloatnumber =
      Number(totalPages) === totalPages && totalPages % 1 !== 0;

    return (
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        count={parseInt(CheckFloatnumber == true ? totalPages + 1 : totalPages)}
        page={Page}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: BackFun, next: NextFun }}
            {...item}
          />
        )}
        onChange={handlePageNumber}
      />
    );
  };

  const data = [
    { title: "Single", value: parseInt(getSingleType), color: "#ff393a" },
    { title: "Group", value: parseInt(getGroupType), color: "#ff7e24" },
  ];

  return (
    <div id="wrapper">
      <Topbar showName={getShowName} />
      <ListItem />
      <div class="content-page">
        {/* Profile */}
        <div className="card" style={{ borderRadius: 15, width: "100%" }}>
          <div className="card-body" style={{ borderRadius: 15, padding: 15 }}>
            <div class="row" style={{ borderRadius: 15, alignItems: "center" }}>
              <div class="col-10">
                <div class="c1ard">
                  <div class="card1-body">
                    <div class="grid-structure">
                      <div class="row">
                        <div
                          class="col-6 col-md-3 form-label"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div class="grid-cont1ainer">
                            {userDetail.picture === null ||
                            userDetail.picture === "" ? (
                              <img
                                src="images/user.png"
                                style={{
                                  width: "60%",
                                  borderRadius: 10,
                                  marginLeft: 15,
                                }}
                              />
                            ) : (
                              <img
                                src={`${ServerURL}/images/${userDetail.picture}`}
                                style={{
                                  width: "60%",
                                  borderRadius: 10,
                                  marginLeft: 15,
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div class="col-lg-9">
                          <div class="row" style={{}}>
                            <div
                              class="col-3 col-md-3 form-label"
                              style={{ width: "25%" }}
                            >
                              <div class="grid-cont1ainer">
                                <div class="row" style={{ padding: 5 }}>
                                  <label
                                    for="simpleinput"
                                    class="form-label"
                                    style={{ fontSize: 12, padding: 0 }}
                                  >
                                    Name
                                  </label>
                                  {userDetail.firstname +
                                    " " +
                                    userDetail.lastname}
                                </div>

                                <div class="row" style={{ padding: 5 }}>
                                  <label
                                    for="simpleinput"
                                    class="form-label"
                                    style={{ fontSize: 12, padding: 0 }}
                                  >
                                    Added
                                  </label>
                                  {moment(userDetail.created_at).format(
                                    "YYYY/MM/DD"
                                  )}
                                </div>
                              </div>
                            </div>

                            <div
                              class="col-6 col-md-3"
                              style={{ width: "40%" }}
                            >
                              <div class="grid-cont1ainer">
                                <div class="row" style={{ padding: 5 }}>
                                  <label
                                    for="simpleinput"
                                    class="form-label"
                                    style={{ fontSize: 12, padding: 0 }}
                                  >
                                    Email
                                  </label>
                                  {userDetail.email}
                                </div>

                                <div class="row" style={{ padding: 5 }}>
                                  <label
                                    for="simpleinput"
                                    class="form-label"
                                    style={{ fontSize: 12, padding: 0 }}
                                  >
                                    Status
                                  </label>
                                  {userDetail.status}
                                </div>
                              </div>
                            </div>

                            <div class="col-6 col-md-3">
                              <div class="grid-cont1ainer">
                                <div class="row" style={{ padding: 5 }}>
                                  <label
                                    for="simpleinput"
                                    class="form-label"
                                    style={{ fontSize: 12, padding: 0 }}
                                  >
                                    Phone Number
                                  </label>
                                  {userDetail.mobile_number}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Profile */}
        <div className="row">
          {/* BarCharts */}
          <div className="col-8 col-md-8 form-label">
            <div
              style={{
                height: "90%",
                width: "100%",
                backgroundColor: "white",
                borderRadius: 20,
                display: "flex",
                // justifyContent: "center",
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
                    fontWeight: 800,
                  }}
                >
                  Visit Timeline
                </div>
                <div
                  className="col-3 col-md-2"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: 0,
                  }}
                >
                  <div class="row">
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
              </div>
              <VictoryChart
                width={1000}
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
                  cornerRadius={15} // Having this be a non-zero number looks good when it isn't transitioning, but looks like garbage when it is....
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
          </div>
          {/* End BarCharts */}

          {/* PieChart */}
          <div style={{ width: "30%", height: "20%" }}>
            <div
              style={{
                width: props.width,
                height: props.height,
                backgroundColor: "white",
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                margin: 20,
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
          </div>
          {/* End PieChart */}
        </div>

        {/* <Visit /> */}
        <div class="card" style={{ borderRadius: 20 }}>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="c1ard">
                  <div class="card1-body">
                    <div class="grid-structure">
                      <div
                        class="row"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div class="col-6 col-md-9 form-label">
                          <div class="grid-cont1ainer">
                            <h5
                              class="mt-0"
                              style={{ color: "#000", fontWeight: 800 }}
                            >
                              Visits
                            </h5>
                          </div>
                        </div>
                        <div
                          class="col-6 col-md-3"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <div class="grid-cont1ainer">
                            <div class="row ">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <button
                                  type="button"
                                  style={{
                                    background: "#f47216",

                                    color: "#fff",
                                    borderRadius: 5,
                                    width: 120,
                                    height: 35,
                                  }}
                                  // onClick={() => handleAddUser()}
                                >
                                  <i class="fe-download"></i> Export
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div class="col-lg-10  form-label">
                          <div
                            class="row"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div class="col-6 col-md-10">
                              <div class="row">
                                <div style={{ fontSize: 13, fontWeight: 500 }}>
                                  Show &nbsp;
                                  <select
                                    style={{
                                      borderColor: "#a2a2a2",
                                      borderBox: "none",
                                      cursor: "pointer",
                                      background: "white",
                                      height: "30px",
                                      width: "70px",
                                      borderRadius: "5px",
                                      paddingLeft: "8px",
                                    }}
                                    onChange={(event) =>
                                      showEntry(parseInt(event.target.value))
                                    }
                                    className="select"
                                  >
                                    show entries
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={200}>200</option>
                                  </select>
                                  &nbsp;Entries
                                </div>
                              </div>
                            </div>
                            <div
                              class="col-3 col-md-2"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                paddingRight: 0,
                              }}
                            >
                              <div class="row">
                                <div className="dropdown float-end">
                                  <a
                                    href={false}
                                    className="dropdown-toggle arrow-none card-drop"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <button
                                      type="button"
                                      style={{
                                        borderRadius: 5,
                                        height: 34,
                                        background: "#005db6",
                                        fontSize: 14,
                                        color: "white",
                                      }}
                                    >
                                      <i
                                        class="mdi mdi-filter"
                                        style={{ color: "white" }}
                                      ></i>{" "}
                                      Filter
                                    </button>
                                  </a>
                                  <div
                                    className="dropdown-menu dropdown-menu-end"
                                    style={{ cursor: "pointer" }}
                                  >
                                    {/* item*/}
                                    <div
                                      href="javascript:void(0);"
                                      className="dropdown-item"
                                      // onClick={() => handleFilter()}
                                    >
                                      Current month
                                    </div>
                                    {/* item*/}
                                    <div
                                      href="javascript:void(0);"
                                      className="dropdown-item"
                                      // onClick={() => handleLastMonthFilter()}
                                    >
                                      Last month
                                    </div>
                                    {/* item*/}
                                    <div
                                      href="javascript:void(0);"
                                      className="dropdown-item"
                                      // onClick={() => handleLast3MonthFilter()}
                                    >
                                      Last 3 month
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-lg-2"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <div class="col-12 col-md-12">
                            <div
                              class="grid-container"
                              style={{ padding: "0px 11px" }}
                            >
                              <div class="row">
                                <div
                                  style={{
                                    border: "1px solid #dee2e6",
                                    borderRadius: 3,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: 0,
                                    margin: 0,
                                  }}
                                >
                                  <div
                                    class="input-group input-group-merge"
                                    style={{}}
                                  >
                                    <input
                                      type="text"
                                      class="form-control"
                                      style={{
                                        zIndex: 0,
                                        height: "32px",
                                        border: "0px solid #fff",
                                      }}
                                      placeholder="Search"
                                      onChange={(e) => handleSearch(e)}
                                    />
                                    <div
                                      class="input-group-text"
                                      data-password="false"
                                    >
                                      {/* <span class="fas fa-search"></span> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="table" style={{ fontSize: 11.5 }}>
                      <table id="productTable" className="table table-hover">
                        <thead className="table">
                          <tr>
                            <th
                              style={{
                                cursor: "pointer",
                                padding: "0px 15px 0px 0px",
                              }}
                              onClick={() => sortTable(0)}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>ID</div>
                              </div>
                            </th>
                            <th
                              style={{
                                cursor: "pointer",
                                padding: 0,
                              }}
                              onClick={() => sortTable(1)}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>Name</div>
                                {/* <div> */}

                                {/* </div> */}
                              </div>
                            </th>
                            <th
                              style={{
                                cursor: "pointer",
                                padding: 0,
                              }}
                              onClick={() => sortTable(2)}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>Mobile Number</div>
                              </div>
                            </th>
                            <th
                              style={{
                                cursor: "pointer",
                                padding: 0,
                              }}
                              onClick={() => sortTable(3)}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>Visit type</div>
                              </div>
                            </th>
                            <th
                              style={{
                                cursor: "pointer",
                                padding: 0,
                              }}
                              onClick={() => sortTable(4)}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>Vidhansabha</div>
                              </div>
                            </th>
                            <th
                              style={{
                                cursor: "pointer",
                                padding: 0,
                              }}
                              onClick={() => sortTable(5)}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>Added on</div>
                              </div>
                            </th>
                            <th
                              style={{
                                cursor: "pointer",
                                padding: 0,
                              }}
                              onClick={() => sortTable(6)}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>Added by</div>
                              </div>
                            </th>
                            <th
                              style={{
                                cursor: "pointer",
                                padding: 0,
                              }}
                              onClick={() => sortTable(7)}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>Actions</div>
                              </div>
                            </th>
                          </tr>
                        </thead>

                        <tbody style={{ fontSize: 13 }}>
                          {getEmployee().length == 0 ? (
                            <td colspan={7}>
                              <p
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                No user yet..!
                              </p>
                            </td>
                          ) : (
                            getEmployee()
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    class="row"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div class="col-12 col-md-6">
                      <div style={{ fontSize: 13, fontWeight: 700 }}>
                        {!getAllVisits.length
                          ? "[Nothing to show]"
                          : "Showing  " +
                            (entryStart + 1) +
                            " to " +
                            entryEnd +
                            " of " +
                            getAllVisits.length +
                            " entries"}
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        {handlePaging()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Visits */}
      </div>
    </div>
  );
}
