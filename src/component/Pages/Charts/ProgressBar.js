import React, { useState, useEffect } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getDataAxios } from "../../Services/NodeServices";

export default function ProgressBar(props) {
  var UserData = JSON.parse(localStorage.getItem("userData"));
  const [getData, setData] = useState([]);

  useEffect(() => {
    fetchVidhanSabhaData();
  }, []);

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

  const showDropdown = () => {
    return getData.map((item) => {
      return (
        <div
          href="javascript:void(0);"
          className="dropdown-item"
          style={{ color: "black" }}
          // onClick={() => handleLastMonthFilter()}
        >
          {item.vidhansabha_name}
        </div>
      );
    });
  };
  return (
    <div
      style={{
        width: 260,
        height: 260,
        backgroundColor: "white",
        borderRadius: 15,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        margin: 15,
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
        {props.title}
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
          value={props.value}
          strokeWidth={14}
          styles={buildStyles({
            pathColor: props.pathColor,
            textColor: props.textColor,
            trailColor: props.trailColor,
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
              {props.data}
            </div>
            <div style={{ fontSize: 10 }}>{props.text}</div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <div
        class="col-12 col-md-12"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: 0,
        }}
      >
        <div class="row">
          <div>
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
                  <i class="mdi mdi-city-variant-outline" />
                  VidhanSabha
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
                {showDropdown()}
              </div>
            </div>
          </div>
        </div>

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
                backgroundColor: "#ff7e24",
              }}
            >
              <i class="mdi mdi-filter"></i> Filter
            </button>
          </a>
          <div
            className="dropdown-menu dropdown-menu-end"
            style={{
              cursor: "pointer",
              backgroundColor: "#ff7e24",
              borderRadius: 18,
            }}
          >
            <div
              href="javascript:void(0);"
              className="dropdown-item"
              // onClick={() => handleLastMonthFilter()}
            >
              3 month
            </div>
            {/* item*/}
            <div
              href="javascript:void(0);"
              className="dropdown-item"
              // onClick={() => handleLast3MonthFilter()}
            >
              6 month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
