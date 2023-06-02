import React, { useState, useEffect } from "react";
import { getDataAxios } from "../../Services/NodeServices";
import swal from "sweetalert";
import moment from "moment";
import { CSVLink } from "react-csv";
import { Pagination, PaginationItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";

export default function UserVisitorTable(props) {
  var fetchLocal = JSON.parse(localStorage.getItem("roleName"));
  const navigate = useNavigate();
  const [getAllVisits, setAllVisits] = useState([]);
  const [getAllUsersExcelDownload, setAllUsersExcelDownload] = useState([]);
  const [entryStart, setEntryStart] = useState(0);
  const [Page, setPage] = useState(1);
  const [entryEnd, setEntryEnd] = useState(10);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [getVisitTableData, setVistTableData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let result = await getDataAxios(
        `visitors/visitorDetailTimeline/${props.userDetail.id}`
      );
      // console.log("result in userDetail", result);
      if (result.status == true) {
        setAllVisits(result.timeLineData);
        setVistTableData(result.timeLineData);
        setAllUsersExcelDownload(result.ExcelData);
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

  const handleUserDetailVisitrFilter = async (startDate, endDate) => {
    try {
      let result = await getDataAxios(
        `visitors/userDetailVisitorFilter/${props.userDetail.id}/${startDate}/${endDate}`
      );
      console.log("result in filter", result);
      if (result.status == true) {
        swal({
          icon: "success",
          title: `${result.timeLineData.length} Record found`,
        });
        setAllVisits(result.timeLineData);
        setVistTableData(result.timeLineData);
        setAllUsersExcelDownload(result.ExcelData);
      } else {
        swal({
          title: `${result.message}`,
          icon: "error",
          button: "ok",
        });
      }
    } catch (error) {
      console.log("error in catch visitor filter", error);
    }
  };

  const handleSearch = async (e) => {
    var searchArr = [];
    getVisitTableData.map((item) => {
      var id = `${item.id}`;
      if (
        (id && id.includes(e.target.value)) ||
        (item.firstname &&
          item.firstname
            .toLowerCase()
            .includes(e.target.value.toLowerCase())) ||
        (item.mobile_number &&
          item.mobile_number
            .toLowerCase()
            .includes(e.target.value.toLowerCase())) ||
        (item.lastname &&
          item.lastname.toLowerCase().includes(e.target.value.toLowerCase()))
      ) {
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
            class="btn btn-primary btn-sm"
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
    return (
      <div>
        <Trans i18nKey="next"> Next </Trans>
      </div>
    );
  };
  function BackFun() {
    return (
      <div>
        <Trans i18nKey="previous"> Previous </Trans>
      </div>
    );
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
                            <Trans i18nKey="Visits"> Visits </Trans>
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
                              {fetchLocal.includes("user_staff") === true ? (
                                <button
                                  className="btn width-sm"
                                  style={{
                                    color: "#fff",
                                    borderRadius: 5,
                                    background: "#f47216",
                                    padding: ".28rem .5rem",
                                    marginRight: 5,
                                  }}
                                  onClick={() => handleAddVisit()}
                                >
                                  <i class="mdi mdi-plus"></i>
                                  <Trans i18nKey="Add_Visit">
                                    {" "}
                                    Add Visitor{" "}
                                  </Trans>
                                </button>
                              ) : null}
                              <CSVLink
                                data={getAllUsersExcelDownload}
                                filename={`${
                                  props.userDetail.firstname +
                                  " " +
                                  props.userDetail.lastname
                                }.csv`}
                              >
                                <button
                                  type="button"
                                  className="btn width-sm"
                                  style={{
                                    background: "#f47216",
                                    color: "#fff",
                                    borderRadius: 5,
                                    marginLeft: 5,
                                  }}
                                >
                                  <i class="fe-download"></i>{" "}
                                  <Trans i18nKey="Export"> Export </Trans>
                                </button>
                              </CSVLink>
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
                                <Trans i18nKey="Show"> Show &nbsp; </Trans>
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
                                  <Trans i18nKey="show_entries">
                                    {" "}
                                    show entries{" "}
                                  </Trans>
                                  <option value={10}>10</option>
                                  <option value={25}>25</option>
                                  <option value={50}>50</option>
                                  <option value={200}>200</option>
                                </select>
                                <Trans i18nKey="entries"> &nbsp;Entries </Trans>
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
                                    className="btn btn-sm"
                                    type="button"
                                    style={{
                                      // borderRadius: 15,
                                      background: "#005db6",
                                      fontSize: 14,
                                      color: "white",
                                    }}
                                  >
                                    <i
                                      class="mdi mdi-filter"
                                      style={{ color: "white" }}
                                    ></i>{" "}
                                    <Trans i18nKey="filter"> Filter </Trans>
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
                                      handleUserDetailVisitrFilter(
                                        moment()
                                          .startOf("month")
                                          .format("YYYY-MM-DD hh:mm:ss"),
                                        moment().format("YYYY-MM-DD hh:mm:ss")
                                      )
                                    }
                                  >
                                    <Trans i18nKey="current_month">
                                      {" "}
                                      Current month{" "}
                                    </Trans>
                                  </div>
                                  {/* item*/}
                                  <div
                                    href="javascript:void(0);"
                                    className="dropdown-item"
                                    onClick={() =>
                                      handleUserDetailVisitrFilter(
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
                                    <Trans i18nKey="last_month">
                                      {" "}
                                      Last month{" "}
                                    </Trans>
                                  </div>
                                  {/* item*/}
                                  <div
                                    href="javascript:void(0);"
                                    className="dropdown-item"
                                    onClick={() =>
                                      handleUserDetailVisitrFilter(
                                        moment()
                                          .subtract(3, "months")
                                          .format("YYYY-MM-DD hh:mm:ss"),
                                        moment().format("YYYY-MM-DD hh:mm:ss")
                                      )
                                    }
                                  >
                                    <Trans i18nKey="last_3_month">
                                      {" "}
                                      Last 3 month{" "}
                                    </Trans>
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
                                    placeholder={
                                      <Trans i18nKey="search"> Search </Trans>
                                    }
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
                              <div>
                                <Trans i18nKey="ID"> ID </Trans>
                              </div>
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
                              <div>
                                <Trans i18nKey="Name"> Name </Trans>
                              </div>
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
                              <div>
                                <Trans i18nKey="Mobile_Number">
                                  {" "}
                                  Mobile Number{" "}
                                </Trans>
                              </div>
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
                              <div>
                                <Trans i18nKey="Visit_Type"> Visit type </Trans>
                              </div>
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
                              <div>
                                <Trans i18nKey="Vidhansabha">
                                  {" "}
                                  Vidhansabha{" "}
                                </Trans>
                              </div>
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
                              <div>
                                <Trans i18nKey="added_on"> Added on</Trans>
                              </div>
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
                              <div>
                                <Trans i18nKey="added_by"> Added by </Trans>
                              </div>
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
                              <div>
                                <Trans i18nKey="action"> Actions </Trans>
                              </div>
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
                              <Trans i18nKey="No_visitor_yet">
                                {" "}
                                No visitor yet..!{" "}
                              </Trans>
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
    </>
  );
}
