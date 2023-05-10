import { PieChart } from "react-minimal-pie-chart";
import Dropdown from "../../Dropdown/dropdown";
import { useState } from "react";
export default function PieCharts(props) {
  const data = [
    { title: "One", value: 20, color: "#ff393a" },
    { title: "Two", value: 15, color: "#ff7e24" },
  ];
  const [showOptions1, setShowOptions1] = useState(false);

  const options1 = [
    { label: "1 months", id: 1 },
    { label: "3 months", id: 2 },
    { label: "6 months", id: 3 },
  ];
  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        backgroundColor: "white",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        margin: 15,
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
          Visit Type
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
                type="button"
                class="btn btn-info btn-sm"
                style={{
                  borderRadius: 12,
                  height: 28,
                  backgroundColor: "#005db6",
                }}
              >
                <i class="mdi mdi-filter"></i> Filter
              </button>
            </a>
            <div
              className="dropdown-menu dropdown-menu-end"
              style={{
                cursor: "pointer",
                backgroundColor: "#005db6",
                borderRadius: 18,
              }}
            >
              {/* item*/}
              <div
                href="javascript:void(0);"
                className="dropdown-item"
                style={{ color: "black" }}
                // onClick={() => handleFilter()}
              >
                1 month
              </div>
              {/* item*/}
              <div
                href="javascript:void(0);"
                className="dropdown-item"
                style={{ color: "black" }}
                // onClick={() => handleLastMonthFilter()}
              >
                3 month
              </div>
              {/* item*/}
              <div
                href="javascript:void(0);"
                className="dropdown-item"
                style={{ color: "black" }}
                // onClick={() => handleLast3MonthFilter()}
              >
                6 month
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
        <span>Single</span>

        <div
          style={{
            width: 15,
            height: 15,
            borderRadius: 10,
            background: "#ff7e24",
            margin: 10,
          }}
        />
        <span> Group</span>
      </div>
    </div>
  );
}
