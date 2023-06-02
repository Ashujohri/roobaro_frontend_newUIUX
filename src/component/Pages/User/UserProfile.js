import React, { useState } from "react";
import moment from "moment";
import { ServerURL } from "../../Services/NodeServices";
import { Trans } from "react-i18next";

export default function UserProfile(props) {
  const [getData, setData] = useState(props.userDetail ?? {});

  return (
    <>
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
                          {getData.picture === null ||
                          getData.picture === "" ? (
                            <img
                              src="images/user.png"
                              width={"70%"}
                              alt="img"
                              style={{ borderRadius: 20 }}
                            />
                          ) : (
                            <img
                              src={`${ServerURL}/images/${getData.picture}`}
                              style={{ borderRadius: 20 }}
                              alt="img"
                              width={"70%"}
                            />
                          )}
                        </div>
                      </div>
                      <div class="col-lg-9">
                        <div class="row">
                          <div class="col-6 col-md-3 mb-4">
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
                                  {getData.firstname
                                    ? getData.firstname + " " + getData.lastname
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
                                  {getData.email ? getData.email : "-"}
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
                                  {getData.mobile_number
                                    ? getData.mobile_number
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
                                  <Trans i18nKey="added_on">Added On </Trans>
                                </label>
                                <label
                                  for="simpleinput"
                                  class="form-label"
                                  style={{ fontSize: 14, color: "#353A40" }}
                                >
                                  {getData.created_at
                                    ? moment(getData.created_at).format(
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
                                  {getData.status ? getData.status : "-"}
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
                                  {getData.user_address
                                    ? getData.user_address
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
                                  {getData.user_organization
                                    ? getData.user_organization
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
    </>
  );
}
