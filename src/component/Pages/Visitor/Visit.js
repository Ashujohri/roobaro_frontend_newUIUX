import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import moment from "moment/moment";
import { CSVLink } from "react-csv";
import { PaginationItem } from "@mui/material";
import { getDataAxios } from "../../Services/NodeServices";
import Topbar from "../../Header/Topbar";
import ListItem from "../../Dashboard/ListItem";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const excelFormat = [
  "xlsx",
  "xlsm",
  "xlsb",
  "xltx",
  "xltm",
  "xls",
  "xlt",
  "xml",
  "xlam",
  "xla",
  "xlw",
  "xlr",
  "csv",
  "xls",
];

export default function Visit(props) {
  let UserData = JSON.parse(localStorage.getItem("userData"));
  // console.table("USERdatasssssss", UserData);
  const navigate = useNavigate();
  const [getAllVisits, setAllVisits] = useState([]);
  const [showVisits, setShowVisits] = useState(false);
  const [getAllUsersExcelDownload, setAllUsersExcelDownload] = useState([]);
  const [entryStart, setEntryStart] = useState(0);
  const [Page, setPage] = useState(1);
  const [entryEnd, setEntryEnd] = useState(10);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [getVisitTableData, setVistTableData] = useState([]);
  const [UploadExcel, setUploadExcel] = useState(false);
  const [getUserExcel, setUserExcel] = useState("");
  const [getLoading, setLoading] = useState(false);
  const [getRefresh, setRefresh] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  // alert(JSON.stringify(getAllVisits))

  useEffect(function () {
    // chkToken();
    fetchAllVisits();
  }, []);

  // const chkToken = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/AdminLogin", { replace: true });
  //   } else {
  //     navigate("/visitors", { replace: true });
  //   }
  // };

  const fetchAllVisits = async () => {
    var res = await getDataAxios(
      `visitors/displayVisitors/${UserData.minister_id}`
    );
    if (props?.timeLineData) {
      setAllVisits(props?.timeLineData);
      setVistTableData(props?.timeLineData);
    } else {
      setAllVisits(res.result);
      setVistTableData(res.result);
    }
  };

  const handleFilter = async (startDateParam, endDateParam) => {
    try {
      let result = await getDataAxios(
        `visitors/filterDisplayVisitors/${UserData.minister_id}/${startDateParam}/${endDateParam}`
      );
      // console.log("result in filter", result);
      if (result.status === true) {
        setAllVisits(result.result);
        setVistTableData(result.result);
      } else {
        Swal.fire({
          icon: "error",
          text: `${result.message}`,
        });
      }
    } catch (error) {
      console.log("error in cathc filter", error);
    }
  };

  const handleClick = () => {
    setShowVisits(true);
  };

  const handleSearch = async (e) => {
    var searchArr = [];
    getVisitTableData.map((item) => {
      var id = `${item.id}`;
      if (id && id.toLowerCase().includes(e.target.value.toLowerCase())) {
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

  const handleViewPage = (item) => {
    navigate("/VisitorDetailView", { state: item });
  };

  const handleAddVisit = () => {
    navigate({ pathname: "/AddVisitor" });
  };

  const showEmployee = (i) => {
    return (
      <tr>
        <td> {getAllVisits[i].id} </td>
        <td> {getAllVisits[i].firstname + " " + getAllVisits[i].lastname} </td>
        <td> {getAllVisits[i].mobile_number} </td>
        <td> {getAllVisits[i].visitor_type} </td>
        <td> {getAllVisits[i].Vidhansabha} </td>
        <td> {getAllVisits[i].created_at} </td>
        <td> {getAllVisits[i].UserAddedBy} </td>
        <td
          style={{
            color:
              getAllVisits[i].visitor_status == "ongoing" ? "green" : "red",
          }}
        >
          {" "}
          {getAllVisits[i].visitor_status}{" "}
        </td>
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
            <i className="fe-eye" style={{ color: "white" }} />
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

  return (
    <>
      {getLoading ? (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "75vh",
          }}
        >
          <img src="/images/loader.gif" width="20%" />
        </div>
      ) : (
        <div id="wrapper">
          <Topbar />
          <ListItem />
          <div className="content-page">
            <div class="container-fluid">
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
                                        onClick={() => handleAddVisit()}
                                      >
                                        <i class="mdi mdi-plus"></i>Add Visitor
                                      </button>

                                      <div
                                        className="modal fade"
                                        id="centermodal"
                                        tabIndex={-1}
                                        aria-hidden="true"
                                        style={{ display: "none" }}
                                      >
                                        <div className="modal-dialog modal-dialog-centered">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h4
                                                className="modal-title"
                                                id="myCenterModalLabel"
                                              >
                                                Import Users
                                              </h4>

                                              <CSVLink
                                                data={getAllUsersExcelDownload}
                                                filename={"User List.csv"}
                                              >
                                                <button
                                                  type="button"
                                                  className="btn btn-primary btn-xs"
                                                  data-bs-dismiss="modal"
                                                  aria-label="Close"
                                                >
                                                  Download sample file
                                                </button>
                                              </CSVLink>
                                            </div>

                                            <div className="modal-body">
                                              <div className="mb-3">
                                                <input
                                                  type="file"
                                                  id="contained-button-filepic"
                                                  className="form-control"
                                                  // onChange={(event) =>
                                                  //   handleExcel(event)
                                                  // }
                                                />
                                              </div>

                                              {UploadExcel ? (
                                                <button
                                                  style={{
                                                    background: "#4261F7",
                                                    border: "1px solid #4261F7",
                                                    color: "#fff",
                                                  }}
                                                  data-bs-dismiss="modal"
                                                  aria-label="Close"
                                                  class="btn btn-primary btn-sm"
                                                  // onClick={(e) =>
                                                  //   handleExcelSubmit(e)
                                                  // }
                                                >
                                                  Import
                                                </button>
                                              ) : null}

                                              <button
                                                type="button"
                                                class="btn btn-info btn-sm"
                                                style={{ marginLeft: 12 }}
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                                // onClick={() => handleClose()}
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        {/* /.modal-dialog */}
                                      </div>

                                      {/* <button
                                    type="button"
                                    class="btn btn-info btn-sm"
                                    style={{ marginLeft: 10, borderRadius: 5 }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#centermodal"
                                  >
                                    <i class="mdi mdi-download"></i>
                                    Import
                                  </button> */}
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
                                      <div
                                        style={{
                                          fontSize: 13,
                                          fontWeight: 500,
                                        }}
                                      >
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
                                            showEntry(
                                              parseInt(event.target.value)
                                            )
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
                                            onClick={() =>
                                              handleFilter(
                                                moment()
                                                  .startOf("month")
                                                  .format(
                                                    "YYYY-MM-DD hh:mm:ss"
                                                  ),
                                                moment().format(
                                                  "YYYY-MM-DD hh:mm:ss"
                                                )
                                              )
                                            }
                                          >
                                            Current month
                                          </div>
                                          {/* item*/}
                                          <div
                                            href="javascript:void(0);"
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleFilter(
                                                moment()
                                                  .subtract(1, "months")
                                                  .startOf("month")
                                                  .format(
                                                    "YYYY-MM-DD hh:mm:ss"
                                                  ),
                                                moment()
                                                  .subtract(1, "months")
                                                  .endOf("month")
                                                  .format("YYYY-MM-DD hh:mm:ss")
                                              )
                                            }
                                          >
                                            Last month
                                          </div>
                                          {/* item*/}
                                          <div
                                            href="javascript:void(0);"
                                            className="dropdown-item"
                                            onClick={() =>
                                              handleFilter(
                                                moment()
                                                  .subtract(3, "months")
                                                  .format(
                                                    "YYYY-MM-DD hh:mm:ss"
                                                  ),
                                                moment().format(
                                                  "YYYY-MM-DD hh:mm:ss"
                                                )
                                              )
                                            }
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
                            <table
                              id="productTable"
                              className="table table-hover"
                            >
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
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div>Status</div>
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
                                      No visit yet..!
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
