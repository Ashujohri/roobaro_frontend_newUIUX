import React, { useEffect, useState } from "react";
import Topbar from "../Header/Topbar";
import ListItem from "../Dashboard/ListItem";

export default function Profile(props) {
  // const userData = props.item ?? JSON.parse(localStorage.getItem("data"));

  return (
    <>
      <div id="wrapper">
        <Topbar />
        <ListItem />
        <div class="content-page">
          <div className="card" style={{ borderRadius: 15, width: "100%" }}>
            <div
              className="card-body"
              style={{ borderRadius: 15, padding: 15 }}
            >
              <div
                class="row"
                style={{ borderRadius: 15, alignItems: "center" }}
              >
                <div class="col-10">
                  <div class="c1ard">
                    <div class="card1-body">
                      <div class="grid-structure">
                        <div class="row">
                          <div
                            class="col-6 col-md-3 form-label"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div class="grid-cont1ainer">
                              <img
                                src="images/user.png"
                                style={{
                                  width: "60%",
                                  borderRadius: 10,
                                  marginLeft: 15,
                                }}
                              />
                            </div>
                          </div>
                          <div class="col-lg-9">
                            <div class="row" style={{}}>
                              <div
                                class="col-3 col-md-3 form-label"
                                style={{ width: "25%" }}
                              >
                                <div class="grid-cont1ainer">
                                  <div class="row" style={{ padding: 5 }}>
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 12, padding: 0 }}
                                    >
                                      Name
                                    </label>
                                    {/* {userData.firstname + " " + userData.lastname} */}
                                    Ashutosh
                                  </div>

                                  <div class="row" style={{ padding: 5 }}>
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 12, padding: 0 }}
                                    >
                                      Added
                                    </label>
                                    {/* {userData.created_at} */}
                                    Sat-May-2023
                                  </div>
                                </div>
                              </div>

                              <div
                                class="col-6 col-md-3"
                                style={{ width: "40%" }}
                              >
                                <div class="grid-cont1ainer">
                                  <div class="row" style={{ padding: 5 }}>
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 12, padding: 0 }}
                                    >
                                      Email
                                    </label>
                                    {/* {userData.email} */}
                                    ashutosh@gmail.com
                                  </div>

                                  <div class="row" style={{ padding: 5 }}>
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 12, padding: 0 }}
                                    >
                                      Status
                                    </label>
                                    {/* {userData.status} */}
                                    Active
                                  </div>
                                </div>
                              </div>

                              <div class="col-6 col-md-3">
                                <div class="grid-cont1ainer">
                                  <div class="row" style={{ padding: 5 }}>
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 12, padding: 0 }}
                                    >
                                      Phone Number
                                    </label>
                                    {/* {userData.mobile_number} */}
                                    8889870969
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
