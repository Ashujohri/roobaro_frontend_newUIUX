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
  const location = useLocation();
  const [getLoading, setLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);
  const [getMobile, setMobile] = useState();
  const [checkvalidate, setcheckvalidate] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleVerify = () => {
    navigate({ pathname: `/MobileVerify` });
  };

  // const GenerateOtp = async () => {
  //   var otp = parseInt(Math.random() * 8999) + 1000;
  //   console.log("OTP>>>>>>>>>>>>", otp);

  //   var result = await postDataAxiosWithoutToken("visitor/sendOTP", {
  //     mobile: mobile,
  //     otp: otp,
  //   });
  //   console.log("result in OTP", result);
  //   alert(result.message)
  //   setBtnStatus(true);
  //   setBtnMsg("Change Mobile No");
  //   setGeneratedOtp(otp);
  // };

  // const MobileDisable = () => {

  //   if (btnMsg == "Change Mobile No") {

  //     setBtnStatus(false);

  //     setMobile("");

  //   }

  // };

  //   useEffect(() => {
  //     chkToken();
  //   }, [props]);

  //   const chkToken = async () => {
  //     console.log("in auth login chk token");
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       navigate("/AdminLogin", { replace: true });
  //     } else {
  //       navigate("/", { replace: true });
  //     }
  //   };

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
    e.preventDefault();

    var otp = parseInt(Math.random() * 8999) + 1000;

    // alert(result)
    var result = await postDataAxios("users/authenticate", {
      mobile: getMobile,
    });
    alert(JSON.stringify(result));
    if (result.status === true) {
      console.log("result------------------", result);
      // var result = await postDataAxios("users/...",{mobile:getMobile,otp:otp})
      navigate(`/MobileVerify`, {
        state: {
          otp: otp,
          roleName: result.roleName[0],
          data: JSON.stringify(result.data),
          scopes: JSON.stringify(result.scopes),
          token: result.token[0],
          status: result.status,
        },
      });
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
