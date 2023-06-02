import React, { useState, useEffect } from "react";
import backimg from "../../../images/bg.png";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { postDataAxios } from "../../Services/NodeServices";

export default function MobileVerify(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [OTP, setOTP] = useState(location.state.otp);
  const [getLoading, setLoading] = useState(false);
  const [getInputOTP, setInputOTP] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [error, setError] = useState(false);
  const [getVerifyMobile, setVerifyMobile] = useState(location.state.mobile);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = async () => {
    try {
      setMinutes(0);
      setSeconds(30);
      setOTP("");
      var otp = parseInt(Math.random() * 8999) + 1000;
      let response = await postDataAxios("users/LoginSendOTP", {
        mobile: getVerifyMobile,
        otp: otp,
      });
      if (response.status === true) {
        setOTP(otp);
        Swal.fire({ icon: "success", text: "Re-send OTP" });
      }
    } catch (error) {
      console.log("error in resend", error);
    }
  };

  const handleverify = (e) => {
    e.preventDefault();
    try {
      if (OTP == getInputOTP) {
        localStorage.setItem(
          "roleName",
          JSON.stringify(location.state.roleName)
        );
        localStorage.setItem("userData", JSON.stringify(location.state.data));
        localStorage.setItem("token", location.state.token);
        navigate("/dashboard", { replace: true });
      } else {
        Swal.fire({ icon: "error", text: "Invalid OTP" });
      }
    } catch (error) {
      console.log("error in catch mobileVerify", error);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // height:1000
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
            <div style={{ width: "30%", borderRadius: 21 }}>
              <div className="text-center mt-1">
                <a href={false}>
                  <img
                    src="images/logo.png"
                    alt=""
                    height={80}
                    width={350}
                    className="wrapper"
                  />
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
                >
                  {/* <img src="/images/loader.gif" width="20%" /> */}
                </div>
              ) : (
                <div
                  className="card mt-2"
                  style={{
                    backgroundColor: "white",
                    borderRadius: 15,
                    boxShadow: "1px 1px 2px #f2f2f2",
                  }}
                >
                  <div className="card-body p-4">
                    <div className="text-right">
                      <h4
                        className="text-uppercase mt-0"
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          marginTop: 10,
                        }}
                      >
                        Verify OTP
                      </h4>
                    </div>
                    <form class="was-validated">
                      <div className="mb-2 w-100">
                        <div>
                          <OTPInput
                            value={getInputOTP}
                            onChange={setInputOTP}
                            autoFocus
                            OTPLength={4}
                            otpType="number"
                            disabled={false}
                            inputStyles={{
                              width: "70%",
                              borderRadius: 5,
                              height: 35,
                            }}
                            secure
                          />
                        </div>
                      </div>
                      {error && OTP.length <= 0 ? (
                        <div
                          style={{
                            textAlign: "left",
                            color: "red",
                            marginBottom: 12,
                          }}
                        >
                          Enter Otp
                        </div>
                      ) : (
                        <></>
                      )}
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
                          onClick={handleverify}
                        >
                          Login
                        </button>
                      </div>

                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ cursor: "pointer" }}>
                          Didn't received OTP ?
                        </div>
                        {seconds > 0 || minutes > 0 ? (
                          <div
                            style={{
                              marginLeft: 5,
                              color: "orange",
                              fontSize: 16,
                              cursor: "pointer",
                            }}
                          >
                            {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                          </div>
                        ) : (
                          <div
                            onClick={resendOTP}
                            style={{
                              color: "orange",
                              marginLeft: 20,
                              fontSize: 14,
                              cursor: "pointer",
                            }}
                          >
                            Resend
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
