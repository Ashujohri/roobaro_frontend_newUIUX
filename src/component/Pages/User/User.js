import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { CSVLink } from "react-csv";
import { PaginationItem } from "@mui/material";
import { getDataAxios } from "../../Services/NodeServices";
import { useNavigate } from "react-router-dom";
import Topbar from "../../Header/Topbar";
import ListItem from "../../Dashboard/ListItem";
import swal from "sweetalert";
import moment from "moment";

export default function User(props) {
  const navigate = useNavigate();
  var UserData = JSON.parse(localStorage.getItem("userData"));
  const [getAllUsers, setAllUsers] = useState([]);
  const [getAllUsersExcelDownload, setAllUsersExcelDownload] = useState([]);
  const [entryStart, setEntryStart] = useState(0);
  const [entryEnd, setEntryEnd] = useState(10);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [Page, setPage] = useState(1);
  const [getUserTableData, setUserTableData] = useState([]);
  const [getLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    try {
      var res = await getDataAxios(`users/displayUser/${UserData.minister_id}`);
      if (res.status == true) {
        setAllUsers(res.result);
        setUserTableData(res.result);
      } else {
        swal({
          title: `${res.message}`,
          icon: "error",
          button: "ok",
        });
      }
    } catch (error) {
      console.log("error in use display 🔥🔥", error);
    }
  };

  const handleSearch = async (e) => {
    var searchArr = [];
    getUserTableData.map((item) => {
      var id = `${item.id}`;
      if (
        (item.firstname &&
          item.firstname
            .toLowerCase()
            .includes(e.target.value.toLowerCase())) ||
        (item.lastname &&
          item.lastname.toLowerCase().includes(e.target.value.toLowerCase())) ||
        (item.mobile_number &&
          item.mobile_number
            .toLowerCase()
            .includes(e.target.value.toLowerCase())) ||
        (id && id.includes(e.target.value))
      ) {
        searchArr.push(item);
      }
    });
    setAllUsers(searchArr);
  };

  const handleViewPage = (item) => {
    navigate("/UserDetailView", { state: { item } });
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
    const calcValue =
      entryStart + value > getAllUsers.length
        ? getAllUsers.length
        : entryStart + value;
    setEntryEnd(calcValue);
    setEntriesPerPage(value);
  };

  const handleAddUser = () => {
    navigate({ pathname: "/AddUser" });
  };

  const handlePageNumber = (entryNumber, value) => {
    let entNumber = value - 1;

    setEntryStart(entNumber * entriesPerPage);
    setEntryEnd(
      (entNumber + 1) * entriesPerPage < getAllUsers.length
        ? (entNumber + 1) * entriesPerPage
        : getAllUsers.length
    );
    setPage(value);
  };

  const getEmployee = () => {
    let c = [];
    if (getAllUsers.length > entriesPerPage) {
      for (let i = entryStart; i < entryEnd; i++) {
        c[i] = showEmployee(i);
      }
    } else {
      for (let i = 0; i < getAllUsers.length; i++) {
        c[i] = showEmployee(i);
      }
    }

    return c;
  };

  const showEmployee = (i) => {
    let Id = "";
    let ministerName = "";
    let Name = "";
    let mobileNumber = "";
    let Email = "";
    let createdDate = "";
    try {
      Id = getAllUsers[i].id;
      Name = getAllUsers[i].firstname + " " + getAllUsers[i].lastname;
      ministerName = getAllUsers[i].MinisterName;
      mobileNumber = getAllUsers[i].mobile_number;
      Email = getAllUsers[i].email;
      createdDate = moment(getAllUsers[i].created_at).format(
        "DD/MM/YYYY HH:mm:ss a"
      );
    } catch (error) {
      Id = "";
      ministerName = "";
      Name = "";
      mobileNumber = "";
      Email = "";
      createdDate = "";
    }
    return (
      <tr>
        <td>{Id}</td>
        <td> {Name} </td>
        <td> {ministerName} </td>
        <td> {mobileNumber} </td>
        <td> {Email} </td>
        <td> {createdDate} </td>
        <td> {createdDate} </td>
        <td>
          <button
            type="button"
            style={{
              borderRadius: 25,
              backgroundColor: "#23aed2",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              handleViewPage(getAllUsers[i]);
            }}
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

  const NextFun = () => {
    return <div>Next</div>;
  };
  function BackFun() {
    return <div>Previous</div>;
  }

  const handlePaging = () => {
    let totalPages = getAllUsers.length / entriesPerPage;
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
                                <h5 class="mt-0">User</h5>
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
                                      // class="btn btn-primary btn-sm"
                                      style={{
                                        background: "#ff7e24",

                                        color: "#fff",
                                        borderRadius: 7,
                                        width: 115,
                                        height: 35,
                                      }}
                                      onClick={() => handleAddUser()}
                                    >
                                      <i class="mdi mdi-plus"></i>Add Users
                                    </button>
                                    {/* { (isCheck.length > 1 && getAllUsers ) && <button
                                    onClick={() => handleMultipleDelete()}
                                    // { isCheck.length > 0 && disabled}
                                    
                                    type="button"
                                    class="btn btn-info btn-sm"
                                    style={{
                                      borderRadius: 5,
                                      height: 34,
                                      marginLeft: 10,
                                      width:120
                                    }}
                                  >
                                    <i class="mdi mdi-delete"></i> Delete
                                  </button>} */}

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

                                          {/* <div className="modal-body">
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
                                               color:'#fff'
                                               
                                                
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
                                        </div> */}
                                        </div>
                                      </div>
                                      {/* /.modal-dialog */}
                                    </div>
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
                                      style={{ fontSize: 13, fontWeight: 500 }}
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
                                          // class="btn btn-info btn-sm"
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
                                    <div style={{ color: "black" }}>ID</div>
                                  </div>
                                </th>
                                <th
                                  style={{
                                    cursor: "pointer",
                                    padding: "0px 15px 0px 0px",
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
                                    <div style={{ color: "black" }}>
                                      User Name
                                    </div>
                                  </div>
                                </th>
                                <th
                                  style={{
                                    cursor: "pointer",
                                    padding: 0,
                                    //   width: "7%",
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
                                    <div style={{ color: "black" }}>
                                      Minister Name
                                    </div>
                                    {/* <div> */}

                                    {/* </div> */}
                                  </div>
                                </th>
                                <th
                                  style={{
                                    cursor: "pointer",
                                    padding: 0,
                                    //   width: "10%",
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
                                    <div style={{ color: "black" }}>
                                      Mobile Number
                                    </div>
                                  </div>
                                </th>
                                <th
                                  style={{
                                    cursor: "pointer",
                                    padding: 0,
                                    //   width: "10%",
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
                                    <div style={{ color: "black" }}>Email</div>
                                  </div>
                                </th>
                                <th
                                  style={{
                                    cursor: "pointer",
                                    padding: 0,
                                    //   width: "9%",
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
                                    <div style={{ color: "black" }}>
                                      Added on
                                    </div>
                                  </div>
                                </th>
                                <th
                                  style={{
                                    cursor: "pointer",
                                    padding: 0,
                                    //   width: "20%",
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
                                    <div style={{ color: "black" }}>
                                      Last activity
                                    </div>
                                  </div>
                                </th>

                                <th
                                  style={{
                                    cursor: "pointer",
                                    padding: 0,
                                    //   width: "10%",
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
                                    <div style={{ color: "black" }}>
                                      Actions
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
                            {!getAllUsers.length
                              ? "[Nothing to show]"
                              : "Showing  " +
                                (entryStart + 1) +
                                " to " +
                                entryEnd +
                                " of " +
                                getAllUsers.length +
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
      )}
    </>
  );
}
