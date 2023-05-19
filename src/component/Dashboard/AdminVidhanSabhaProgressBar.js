import React, { useState, useEffect } from "react";
import { getDataAxios } from "../Services/NodeServices";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";
import moment from "moment";

export default function AdminVidhanSabhaProgressBar(props) {
  var UserData = JSON.parse(localStorage.getItem("userData"));
  const [getData, setData] = useState([]);
  const [getTotalVisitor, setTotalVisitor] = useState("");
  const [getVidhanSabhaSegment, setVidhanSabhaSegment] = useState("");
  const [getVidhanSegmentFilter, setVidhanSegmentFilter] = useState("");
  const [getVidhanStartDateFilter, setVidhanStartDateFilter] = useState("");
  const [getVidhanFilter, setVidhanFilter] = useState("");
  const [getVidhanEndDateFilter, setVidhanEndDateFilter] = useState("");

  useEffect(() => {
    fetchVidhanSabhaData();
    fetchProgressChartsData();
  }, []);

  // API calling for All dashboard KPIs
  const fetchProgressChartsData = async () => {
    try {
      let result = await getDataAxios(
        `admin/adminDashboardKPI/${UserData.minister_id}`
      );
      if (result?.status === true) {
        if (result.result.length != 0) {
          setVidhanSabhaSegment(result.result[0].vidhansabhaPercent);
          setTotalVisitor(result.result[0].TotalVisitor);
        } else {
          setVidhanSabhaSegment(0);
          setTotalVisitor(0);
        }
      } else {
        Swal.fire({
          icon: "error",
          text: `${result.message}`,
        });
      }
    } catch (error) {
      console.log("error in fetch progress charts 🔥🔥🔥", error);
    }
  };

  // API calling for dropdown filter in KPIs
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

  // API calling for Vidhansabha Segment Filter
  const handleFilter = async () => {
    try {
      if (getVidhanSegmentFilter != "" || getVidhanStartDateFilter != "") {
        let result = await getDataAxios(
          `admin/dashboardVidhanSabhaFilterKPI/${UserData.minister_id}/${
            getVidhanSegmentFilter == "" ? "undefined" : getVidhanSegmentFilter
          }/${
            getVidhanStartDateFilter == ""
              ? "undefined"
              : getVidhanStartDateFilter
          }/${
            getVidhanEndDateFilter == "" ? undefined : getVidhanEndDateFilter
          }`
        );
        if (result?.status === true) {
          if (result.result.length != 0) {
            setVidhanSabhaSegment(result.result[0].vidhansabhaPercent);
            setTotalVisitor(result.result[0].TotalVisitor);
            setVidhanSegmentFilter("");
            setVidhanFilter("");
            setVidhanEndDateFilter("");
            setVidhanStartDateFilter("");
          } else {
            setVidhanSabhaSegment(0);
            setTotalVisitor(0);
            setVidhanSegmentFilter("");
            setVidhanFilter("");
            setVidhanEndDateFilter("");
            setVidhanStartDateFilter("");
          }
        } else {
          Swal.fire({
            icon: "error",
            text: `${result.message}`,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          text: `Please select filter`,
        });
      }
    } catch (error) {
      console.log("error in handlefilter catch", error);
    }
  };

  // Dropdown function for filters
  const showDropdown = () => {
    return getData.map((item) => {
      return (
        <option
          style={{ color: "white", fontWeight: 650 }}
          value={item.id}
          key={item.id}
        >
          {item.vidhansabha_name}
        </option>
      );
    });
  };

  // Vidhansabha segment filter for functioning function
  const vidhanFilterFunc = (value) => {
    if (value == "1 Month") {
      setVidhanFilter(value);
      setVidhanStartDateFilter(
        moment()
          .subtract(1, "months")
          .startOf("month")
          .format("YYYY-MM-DD hh:mm:ss")
      );
      setVidhanEndDateFilter(
        moment()
          .subtract(1, "months")
          .endOf("month")
          .format("YYYY-MM-DD hh:mm:ss")
      );
    } else if (value == "3 Month") {
      setVidhanFilter(value);
      setVidhanStartDateFilter(
        moment().subtract(3, "months").format("YYYY-MM-DD hh:mm:ss")
      );
      setVidhanEndDateFilter(moment().format("YYYY-MM-DD hh:mm:ss"));
    } else if (value == "6 Month") {
      setVidhanFilter(value);
      setVidhanStartDateFilter(
        moment().subtract(6, "months").format("YYYY-MM-DD hh:mm:ss")
      );
      setVidhanEndDateFilter(moment().format("YYYY-MM-DD hh:mm:ss"));
    } else {
      setVidhanSegmentFilter(value);
    }
  };

  const convertVidhanFunc = (b) => {
    if (b == 0) {
      return "00";
    } else {
      return `${b.toFixed(2)}%`;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: 15,
      }}
    >
      <div
        className="row"
        style={{
          padding: 18,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          class="col-8"
          style={{
            display: "flex",
            // fontFamily: "Poppins",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Vidhansabha Segments
        </div>
        <div
          className="col-4"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button
            className="btn btn-sm waves-effect waves-light"
            style={{
              background: "#ff7e24",
              color: "#fff",
              borderRadius: 15,
              height: "30px",
            }}
            onClick={() => handleFilter()}
          >
            Apply
          </button>
        </div>
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
          value={getTotalVisitor}
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
              {convertVidhanFunc(parseFloat(getVidhanSabhaSegment))}
            </div>
            <div style={{ fontSize: 10 }}>{getTotalVisitor} total visitors</div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <div
        class="col-12 col-md-12"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <div className="row">
          <div className="col-12" style={{ display: "flex" }}>
            <select
              className="form-select form-select-sm"
              style={{
                cursor: "pointer",
                backgroundColor: "#005db6",
                color: "white",
                borderRadius: 18,
              }}
              value={getVidhanSegmentFilter}
              onChange={(e) => vidhanFilterFunc(e.target.value)}
            >
              <option style={{ color: "white", fontWeight: 650 }} selected>
                VidhanSabha
              </option>
              {showDropdown()}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-12" style={{ display: "flex" }}>
            <select
              className="form-select form-select-sm"
              style={{
                height: 28,
                backgroundColor: "#ff7e24",
                borderRadius: 18,
                cursor: "pointer",
              }}
              onChange={(e) => vidhanFilterFunc(e.target.value)}
              value={getVidhanFilter}
            >
              <option selected style={{ color: "white", fontWeight: 650 }}>
                Filter
              </option>
              <option
                style={{ color: "white", fontWeight: 650 }}
                value={"1 Month"}
              >
                1 Month
              </option>
              <option
                style={{ color: "white", fontWeight: 650 }}
                value={"3 Month"}
              >
                3 Month
              </option>
              <option
                style={{ color: "white", fontWeight: 650 }}
                value={"6 Month"}
              >
                6 Month
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
