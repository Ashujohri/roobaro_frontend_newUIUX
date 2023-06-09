import React from "react";
import Topbar from "../Header/Topbar";
import ListItem from "../Dashboard/ListItem";
import moment from "moment";
import { Trans } from "react-i18next";

export default function Profile(props) {
  const userData = props.item ?? JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <div id="wrapper">
        <Topbar />
        <ListItem />
        <div class="content-page">
          <div className="card">
            <div className="card-body">
              <div class="row">
                <div class="col-12">
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
                                alt="img"
                                width={"60%"}
                                src="images/user.png"
                                style={{ borderRadius: 20 }}
                              />
                            </div>
                          </div>
                          <div class="col-lg-9">
                            <div class="row">
                              <div class="col-6 col-md-3">
                                <div class="grid-cont1ainer">
                                  <div class="row">
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 12, margin: 0 }}
                                    >
                                      <Trans i18nKey="Name"> Name </Trans>
                                    </label>
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 14, color: "#353A40" }}
                                    >
                                      {userData.firstname
                                        ? userData.firstname +
                                          " " +
                                          userData.lastname
                                        : "-"}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div class="col-6 col-md-3">
                                <div class="grid-con1tainer">
                                  <div class="row">
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 12, margin: 0 }}
                                    >
                                      <Trans i18nKey="Email"> Email </Trans>
                                    </label>
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 14, color: "#353A40" }}
                                    >
                                      {userData.email ? userData.email : "-"}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div class="col-6 col-md-3">
                                <div class="grid-con1tainer">
                                  <div class="row">
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 12, margin: 0 }}
                                    >
                                      <Trans i18nKey="Mobile_Number">
                                        {" "}
                                        Mobile Number{" "}
                                      </Trans>
                                    </label>
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 14, color: "#353A40" }}
                                    >
                                      {userData.mobile_number
                                        ? userData.mobile_number
                                        : "-"}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div class="col-6 col-md-3">
                                <div class="grid-con1tainer">
                                  <div class="row">
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 12, margin: 0 }}
                                    >
                                      <Trans i18nKey="added_on">
                                        Added On{" "}
                                      </Trans>
                                    </label>
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 14, color: "#353A40" }}
                                    >
                                      {userData.created_at
                                        ? moment(userData.created_at).format(
                                            "DD/MM/YYYY"
                                          )
                                        : "-"}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div class="col-6 col-md-3">
                                <div class="grid-con1tainer">
                                  <div class="row">
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 12, margin: 0 }}
                                    >
                                      <Trans i18nKey="Status"> Status </Trans>
                                    </label>
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 14, color: "#353A40" }}
                                    >
                                      {userData.status ? userData.status : "-"}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div class="col-6 col-md-3">
                                <div class="grid-con1tainer">
                                  <div class="row">
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 12, margin: 0 }}
                                    >
                                      <Trans i18nKey="Addres"> Address </Trans>
                                    </label>
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 14, color: "#353A40" }}
                                    >
                                      {userData.user_address
                                        ? userData.user_address
                                        : "-"}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div class="col-6 col-md-3">
                                <div class="grid-con1tainer">
                                  <div class="row">
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 12, margin: 0 }}
                                    >
                                      <Trans i18nKey="Organization">
                                        {" "}
                                        Organization{" "}
                                      </Trans>
                                    </label>
                                    <label
                                      for="simpleinput"
                                      class="form-label"
                                      style={{ fontSize: 14, color: "#353A40" }}
                                    >
                                      {userData.user_organization
                                        ? userData.user_organization
                                        : "-"}
                                    </label>
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
