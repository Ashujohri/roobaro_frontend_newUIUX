import React, { useState, useEffect } from "react";
import { getDataAxios } from "../Services/NodeServices";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";
import moment from "moment";

export default function AdminEngageProgressBar(props) {
  var UserData = JSON.parse(localStorage.getItem("userData"));
  const [getData, setData] = useState([]);
  const [getEngageSegmentFilter, setEngageSegmentFilter] = useState("");
  const [getEngageFilter, setEngageFilter] = useState("");
  const [getEngageStartDateFilter, setEngageStartDateFilter] = useState("");
  const [getEngageEndDateFilter, setEngageEndDateFilter] = useState("");
  const [getTotalEngageVisitor, setTotalEngageVisitor] = useState("");
  const [getEngageTime, setEngageTime] = useState("");

  useEffect(() => {
    fetchProgressChartsData();
    fetchVidhanSabhaData();
  }, []);

  // API calling for All dashboard KPIs
  const fetchProgressChartsData = async () => {
    try {
      let result = await getDataAxios(
        `admin/adminDashboardKPI/${UserData.minister_id}`
      );
      if (result?.status === true) {
        if (result.result.length != 0) {
          setEngageTime(result.result[0].engagementPercent);
          setTotalEngageVisitor(result.result[0].TotalVisitor);
        } else {
          setEngageTime(0);
          setTotalEngageVisitor(0);
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

  // API calling for Engage Segment Filter
  const handleEngageFilter = async () => {
    try {
      if (getEngageSegmentFilter != "" || getEngageStartDateFilter != "") {
        let result = await getDataAxios(
          `admin/dashboardEngageSegmentFilterKPI/${UserData.minister_id}/${
            getEngageSegmentFilter == "" ? "undefined" : getEngageSegmentFilter
          }/${
            getEngageStartDateFilter == ""
              ? "undefined"
              : getEngageStartDateFilter
          }/${
            getEngageEndDateFilter == "" ? "undefined" : getEngageEndDateFilter
          }`
        );
        if (result?.status === true) {
          if (result.result.length != 0) {
            setEngageTime(result.result[0].engagementPercent);
            setTotalEngageVisitor(result.result[0].TotalVisitor);
            setEngageSegmentFilter("");
            setEngageFilter("");
            setEngageStartDateFilter("");
            setEngageEndDateFilter("");
          } else {
            setEngageTime(0);
            setTotalEngageVisitor(0);
            setEngageSegmentFilter("");
            setEngageFilter("");
            setEngageStartDateFilter("");
            setEngageEndDateFilter("");
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
      console.log("error in catch handlEngage", error);
    }
  };

  // Engagement segment filter for functioning function
  const engageFilterFunc = (value) => {
    if (value == "1 Month") {
      setEngageFilter(value);
      setEngageStartDateFilter(
        moment()
          .subtract(1, "months")
          .startOf("month")
          .format("YYYY-MM-DD hh:mm:ss")
      );
      setEngageEndDateFilter(
        moment()
          .subtract(1, "months")
          .endOf("month")
          .format("YYYY-MM-DD hh:mm:ss")
      );
    } else if (value == "3 Month") {
      setEngageFilter(value);
      setEngageStartDateFilter(
        moment().subtract(3, "months").format("YYYY-MM-DD hh:mm:ss")
      );
      setEngageEndDateFilter(moment().format("YYYY-MM-DD hh:mm:ss"));
    } else if (value == "6 Month") {
      setEngageFilter(value);
      setEngageStartDateFilter(
        moment().subtract(6, "months").format("YYYY-MM-DD hh:mm:ss")
      );
      setEngageEndDateFilter(moment().format("YYYY-MM-DD hh:mm:ss"));
    } else {
      setEngageSegmentFilter(value);
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

  const convertFuncEngage = (a) => {
    if (a == 0) {
      return "00";
    } else {
      return `${a.toFixed(2)}%`;
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
          Total Engagement Time
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
            onClick={() => handleEngageFilter()}
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
          value={getTotalEngageVisitor}
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
              {convertFuncEngage(parseFloat(getEngageTime))}
            </div>
            <div style={{ fontSize: 10 }}>
              {getTotalEngageVisitor} total visitors
            </div>
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
              value={getEngageSegmentFilter}
              onChange={(e) => engageFilterFunc(e.target.value)}
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
              onChange={(e) => engageFilterFunc(e.target.value)}
              value={getEngageFilter}
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
