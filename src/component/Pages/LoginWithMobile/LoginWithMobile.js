import React, { useState, useEffect } from "react";
import backimg from "../../../images/background.png";
// import '../index.css'

import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import { postDataAxios } from "../../Services/NodeServices";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function LoginWithMobile() {
  const navigate = useNavigate();
  const [getLoading, setLoading] = useState(false);
  const [getMobile, setMobile] = useState();
  const [checkvalidate, setcheckvalidate] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setcheckvalidate(true);
    } else {
      handleOtp();
    }
    setValidated(true);
  };

  const handleOtp = async (e) => {
    try {
      var otp = parseInt(Math.random() * 8999) + 1000;
      let result = await postDataAxios("users/authenticate", {
        mobile: getMobile,
      });
      console.log("result", result);
      if (result.status === true) {
        let response = await postDataAxios("users/LoginSendOTP", {
          mobile: getMobile,
          otp: otp,
        });
        if (response.status === true) {
          navigate(`/MobileVerify`, {
            state: {
              otp: otp,
              roleName: result.roleName[0],
              data: result.data,
              scopes: result.scopes,
              token: result.token,
              status: result.status,
            },
          });
        }
      }
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#f7f7f7" }}>
        <div
          style={{
            backgroundImage: `url(${backimg})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>
            <div
              className="container"
              style={{
                height: "100vh",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <div className="row justify-content-center"> */}
              <div className="loginwidth">
                <div className="text-center mt-4">
                  <a href={false}>
                    <img src="images/logo.png" alt="" height={45} />
                  </a>
                </div>
                {getLoading ? (
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      height: "75vh",
                    }}
                  ></div>
                ) : (
                  <div
                    className="card mt-2"
                    style={{
                      backgroundColor: "white",
                      height: "20%",
                      width: "90%",
                      borderRadius: 10,
                      boxShadow: "1px 2px 9px #000",
                      marginBottom: 16,
                      marginLeft: 20,
                    }}
                  >
                    <div className="card-body p-4">
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                      >
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom03"
                          >
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Mobile number"
                              onChange={(event) =>
                                setMobile(event.target.value)
                              }
                              value={getMobile}
                              pattern="[6-9]{1}[0-9]{9}"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Enter valid mobile number
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>
                        <div className="d-grid text-center">
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#005db6",
                              color: "white",
                              borderRadius: 10,
                              fontFamily: "Poppins",
                              fontWeight: 600,
                              fontSize: 12,
                            }}
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                      </Form>
                    </div>
                    {/* end card-body */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
