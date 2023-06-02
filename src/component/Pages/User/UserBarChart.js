import React, { useState, useEffect } from "react";
import { getDataAxios } from "../../Services/NodeServices";
import Swal from "sweetalert2";
import moment from "moment";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
} from "victory";
import "../../BarchartCss.css";
import { Trans, useTranslation } from "react-i18next";

export default function UserBarChart(props) {
  const [getBarChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchBarChartData();
  }, [props]);

  const fetchBarChartData = async (startDate, endDate) => {
    try {
      let result = await getDataAxios(
        `users/userDetailViewBarChart/${props.userDetail.id}/${
          startDate == "" ? "undefined" : startDate
        }/${endDate == "" ? "undefined" : endDate}`
      );
      if (result?.status === true) {
        if (result.data.length != 0) {
          setBarChartData(result.data);
        } else {
          setBarChartData(0);
        }
      } else {
        Swal.fire({
          icon: "error",
          text: `${result.message}`,
        });
      }
    } catch (error) {
      console.log("error in catch BarChart Data", error);
    }
  };

  return (
    <>
      <div className="col-8 col-md-8 form-label">
        <div
          style={{
            width: "100%",
            height: "90%",
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
              <Trans i18nKey="Visitors_trend"> Visitors trend </Trans>
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
                      fetchBarChartData(
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
                      fetchBarChartData(
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
                      fetchBarChartData(
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
            <VictoryBar
              barRatio={1}
              cornerRadius={12} // Having this be a non-zero number looks good when it isn't transitioning, but looks like garbage when it is....
              style={{ data: { fill: "#f47216", width: 40 } }}
              alignment="middle"
              data={getBarChartData}
              x="x"
              y="y"
              labelComponent={<VictoryLabel dy={20} />}
            />
          </VictoryChart>
        </div>
      </div>
    </>
  );
}
