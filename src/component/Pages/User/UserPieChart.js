import moment from "moment";
import React, { useState, useEffect } from "react";
import { getDataAxios } from "../../Services/NodeServices";
import { PieChart } from "react-minimal-pie-chart";
import swal from "sweetalert";
import { Trans } from "react-i18next";

export default function UserPieChart(props) {
  const [getGroupType, setGroupType] = useState([]);
  const [getSingleType, setSingleType] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let result = await getDataAxios(
        `visitors/visitorDetailTimeline/${props.userDetail.id}`
      );
      if (result.status == true) {
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

  const handleFilterVisitType = async (startDate, endDate) => {
    try {
      let result = await getDataAxios(
        `visitors/userDetailVisitTypeFilter/${props.userDetail.id}/${startDate}/${endDate}`
      );
      if (result.status == true) {
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
      console.log("error in catch visitType filter", error);
    }
  };

  const data = [
    { title: "Single", value: parseInt(getSingleType), color: "#ff393a" },
    { title: "Group", value: parseInt(getGroupType), color: "#ff7e24" },
  ];

  return (
    <>
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
            <Trans i18nKey="Visit_Type"> Visit Type </Trans>
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
                  class="btn btn-sm"
                  type="button"
                  style={{
                    background: "#005db6",
                    fontSize: 14,
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
                }}
              >
                {/* item*/}
                <div
                  href="javascript:void(0);"
                  className="dropdown-item"
                  // style={{ color: "black", fontWeight: 650 }}
                  onClick={() =>
                    handleFilterVisitType(
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
                  // style={{ color: "black", fontWeight: 650 }}
                  onClick={() =>
                    handleFilterVisitType(
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
                  // style={{ color: "black", fontWeight: 650 }}
                  onClick={() =>
                    handleFilterVisitType(
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
            <Trans i18nKey="Single">Single </Trans>
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
            {" "}
            <Trans i18nKey="Group"> Group </Trans>
          </span>
        </div>
      </div>
    </>
  );
}
