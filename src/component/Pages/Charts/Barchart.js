import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
  VictoryLabel,
  VictoryGroup,
  VictoryAxis,
  VictoryBrushLine,
} from "victory";

// Styles sets a 500 max-width on the root container div for the app.
import "../../BarchartCss.css";

export default function Barchart(props) {
  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          height: "100%",
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
            Visitors trend
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
                  color: "white",
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
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6]}
            tickFormat={[
              "Jan",
              "Feb",
              "March",
              "April",
              "May",
              "June",
              "July",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
          />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1000}`} />
          <VictoryBar
            barRatio={1}
            // barWidth={({ index }) => index * 3 + 30}
            cornerRadius={12} // Having this be a non-zero number looks good when it isn't transitioning, but looks like garbage when it is....
            style={{ data: { fill: "#f47216", width: 40 } }}
            alignment="middle"
            // labels={d => d.x}
            data={[
              { Year: "Jan", earning: 4500000 },
              { Year: "Feb", earning: 2500000 },
              { Year: "March", earning: 5000000 },
              { Year: "April", earning: 7500000 },
              { Year: "May", earning: 1000000 },
              { Year: "June", earning: 1400000 },
              { Year: "July", earning: 1700000 },
              { Year: "Aug", earning: 1900000 },
              { Year: "Sep", earning: 2200000 },
              { Year: "Oct", earning: 2400000 },
              { Year: "Nov", earning: 2600000 },
              { Year: "Dec", earning: 3000000 },
            ]}
            x="Year"
            y="earning"
            labelComponent={<VictoryLabel dy={20} />}
          />
        </VictoryChart>
      </div>
    </div>
  );
}
