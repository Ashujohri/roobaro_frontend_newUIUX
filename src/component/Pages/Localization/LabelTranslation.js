import React, { useState, useEffect } from "react";
import Topbar from "../../Header/Topbar";
import ListItem from "../../Dashboard/ListItem";
import Pagination from "@mui/material/Pagination";
import moment from "moment/moment";
import { CSVLink } from "react-csv";
import { PaginationItem } from "@mui/material";
import { getDataAxios } from "../../Services/NodeServices";

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

export default function LabelTranslation(props) {
  const [getAllLabelExcelDownload, setAllLabelsExcelDownload] = useState([]);
  const [entryStart, setEntryStart] = useState(0);
  const [Page, setPage] = useState(1);
  const [entryEnd, setEntryEnd] = useState(10);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [getAllLabels, setAllLabels] = useState([]);
  const [getAllHindiLabels, setAllHindiLabels] = useState([]);
  const [getShowName, setShowName] = useState("Label Translations");
  const [getLabels, setLabels] = useState([]);

  useEffect(() => {
    fetchLabelTranslationData();
    fetchLanguages();
  }, [props]);

  const fetchLanguages = async () => {
    try {
      let result = await getDataAxios(`language/displayLanguage`);
      // console.log("result of languages", result);
      if (result.status === true) {
        setLabels(result.result);
      }
    } catch (error) {
      console.log("error in fetch Languages", error);
    }
  };

  const fetchLabelTranslationData = async () => {
    try {
      let result = await getDataAxios(`label/displayLabelTranslation`);
      // console.log("result of label translations", result);
      if (result.status === true) {
        // console.log("result", result);
        setAllLabels(result.result);
        setAllHindiLabels(result.Hindi);
        
      }
    } catch (error) {
      console.log("error in label translation", error);
    }
  };

  const FilterFunction = async () => {
    getLabels.filter((langItem) => {
      getAllLabels.map((allLabelItem) => {
        if (langItem.id == allLabelItem.language_id) {
          console.log("jnjnkjnkjnjn");
        }
      });
    });
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
      entryStart + value > getAllLabels.length
        ? getAllLabels.length
        : entryStart + value
    );
    setEntriesPerPage(value);
  };

  const getEmployee = (indOfRow) => {
    let c = [];
    if (getAllLabels.length > entriesPerPage) {
      for (let i = entryStart; i < entryEnd; i++) {
        c[i] = showEmployee(i);
      }
    } else {
      for (let i = 0; i < getAllLabels.length; i++) {
        c[i] = showEmployee(i);
      }
    }
    return c;
  };

  const showEmployee = (i) => {
    let LabelName = "";
    let HindiLabelName = "";
    try {
      LabelName = getAllLabels[i].label_translation;
      HindiLabelName = getAllHindiLabels[i].label_translation;
    } catch (error) {
      LabelName = "";
      HindiLabelName = "";
    }
    return (
      <tr>
        <td> {LabelName} </td>
        <td> {HindiLabelName} </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
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
            // onClick={() => handleViewPage(getAllLabels[i])}
          >
            <i className="fe-eye" />
          </button>
        </td>
      </tr>
    );
  };
  const handlePageNumber = (entryNumber, value) => {
    let entNumber = value - 1;

    setEntryStart(entNumber * entriesPerPage);
    setEntryEnd(
      (entNumber + 1) * entriesPerPage < getAllLabels.length
        ? (entNumber + 1) * entriesPerPage
        : getAllLabels.length
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
    let totalPages = getAllLabels.length / entriesPerPage;
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
    <div id="wrapper">
      <Topbar showName={getShowName} />
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
                          <div class="col-4 col-md-8 form-label">
                            <div class="grid-cont1ainer">
                              <h5
                                class="mt-0"
                                style={{ color: "#000", fontWeight: 800 }}
                              >
                                Label Translations
                              </h5>
                            </div>
                          </div>
                          <div
                            class="col-8 col-md-4"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <div>
                              <div class="grid-cont1ainer">
                                <div class="row ">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      padding: 5,
                                    }}
                                  >
                                    {/* <CSVLink
                                      // data={getAllUsersExcelDownload}
                                      filename={"labels.csv"}
                                    > */}
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
                                      <i class="fe-download"></i> Export
                                    </button>
                                    {/* </CSVLink> */}
                                    <button
                                      className="btn btn-primary width-sm"
                                      style={{
                                        color: "#fff",
                                        borderRadius: 5,
                                        padding: ".28rem .5rem",
                                        marginRight: 5,
                                      }}
                                    >
                                      <i class="mdi mdi-plus"></i>Import
                                    </button>
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
                              {/*  */}
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
                                  <button
                                    className="btn btn-sm"
                                    type="button"
                                    style={{
                                      borderRadius: 8,
                                      background: "#005db6",
                                      fontSize: 14,
                                      color: "white",
                                    }}
                                  >
                                    <i
                                      class="mdi mdi-filter"
                                      style={{ color: "white" }}
                                    ></i>{" "}
                                    Generate JSON
                                  </button>
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
                              {getLabels.map((item) => {
                                return (
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
                                        {item.language_name === "English"
                                          ? "Default"
                                          : item.language_name}
                                      </div>
                                    </div>
                                  </th>
                                );
                              })}
                              <th>Actions</th>
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
                                  No label yet..!
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
                          {!getAllLabels.length
                            ? "[Nothing to show]"
                            : "Showing  " +
                              (entryStart + 1) +
                              " to " +
                              entryEnd +
                              " of " +
                              getAllLabels.length +
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
  );
}
