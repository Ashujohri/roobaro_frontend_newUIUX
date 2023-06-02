import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { getDataAxios } from "../Services/NodeServices";
import Swal from "sweetalert2";
import moment from "moment";
import { Trans } from "react-i18next";

export default function AdminVisitorStatusType(props) {
  var UserData = JSON.parse(localStorage.getItem("userData"));
  const [getSingleData, setSingleData] = useState("");
  const [getGroupData, setGroupData] = useState("");

  useEffect(() => {
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
          setSingleData(result.single[0].singlePercent);
          setGroupData(result.group[0].groupPercent);
        } else {
          setSingleData(0);
          setGroupData(0);
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

  // API calling for Visitor status filters
  const handleVisitorStatusFilter = async (startDate, endDate) => {
    try {
      let result = await getDataAxios(
        `admin/dashboardVisitorStatusFilterKPI/${UserData.minister_id}/${startDate}/${endDate}`
      );
      if (result?.status === true) {
        if (result.group.length != 0 || result.single.length != 0) {
          setSingleData(result.single[0].singlePercent);
          setGroupData(result.group[0].groupPercent);
        } else {
          setSingleData(0);
          setGroupData(0);
        }
      } else {
        Swal.fire({
          icon: "error",
          text: `${result.message}`,
        });
      }
    } catch (error) {
      console.log("error in catch visitor filter", error);
    }
  };

  const data = [
    { title: "Single", value: parseInt(getSingleData), color: "#ff393a" },
    { title: "Group", value: parseInt(getGroupData), color: "#ff7e24" },
  ];
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: 15,
        width: "30%",
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
          <Trans i18nKey="Visit_Type"> Visit Type </Trans>
        </div>
        <div
          className="col-4"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div className="dropdown float-end">
            <a
              href={false}
              className="dropdown-toggle arrow-none card-drop"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <button
                type="button"
                class="btn btn-sm"
                style={{
                  background: "#005db6",
                  color: "white",
                }}
              >
                <i class="mdi mdi-filter"></i>{" "}
                <Trans i18nKey="filter"> Filter </Trans>
              </button>
            </a>
            <div
              className="dropdown-menu dropdown-menu-end"
              style={{
                cursor: "pointer",
                // backgroundColor: "#005db6",
              }}
            >
              {/* item*/}
              <div
                href="javascript:void(0);"
                className="dropdown-item"
                style={{ color: "black", fontWeight: 650 }}
                onClick={() =>
                  handleVisitorStatusFilter(
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
                <Trans i18nKey="1_Month"> 1 month </Trans>
              </div>
              {/* item*/}
              <div
                href="javascript:void(0);"
                className="dropdown-item"
                style={{ color: "black", fontWeight: 650 }}
                onClick={() =>
                  handleVisitorStatusFilter(
                    moment()
                      .subtract(3, "months")
                      .format("YYYY-MM-DD hh:mm:ss"),
                    moment().format("YYYY-MM-DD hh:mm:ss")
                  )
                }
              >
                <Trans i18nKey="3_Month"> 3 month </Trans>
              </div>
              {/* item*/}
              <div
                href="javascript:void(0);"
                className="dropdown-item"
                style={{ color: "black", fontWeight: 650 }}
                onClick={() =>
                  handleVisitorStatusFilter(
                    moment()
                      .subtract(6, "months")
                      .format("YYYY-MM-DD hh:mm:ss"),
                    moment().format("YYYY-MM-DD hh:mm:ss")
                  )
                }
              >
                <Trans i18nKey="6_Month"> 6 month </Trans>
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
        <span>
          <Trans i18nKey="Single"> Single </Trans>
        </span>

        <div
          style={{
            width: 15,
            height: 15,
            borderRadius: 10,
            background: "#ff7e24",
            margin: 10,
          }}
        />
        <span>
          <Trans i18nKey="Group"> Group </Trans>
        </span>
      </div>
    </div>
  );
}
