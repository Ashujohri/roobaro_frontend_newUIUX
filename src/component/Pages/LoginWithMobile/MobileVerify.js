import React, { useState, useEffect } from "react";
import backimg from "../../../images/background.png";
// import { postDataAxios } from "../../../services/FetchNodeServices";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function MobileVerify(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [OTP, setOTP] = useState(location.state.otp);
  const [getLoading, setLoading] = useState(false);
  const [getInputOTP, setInputOTP] = useState("");
  var [time, setTime] = useState(10);
  var [refresh, setRefresh] = useState(false);
  var [seconds, setSeconds] = useState(true);
  var interval;
  console.table("MobileVerify", location.state);

  const myTimer = () => {
    if (seconds) {
      var t = time;
      interval = setInterval(() => {
        if (t >= 1) {
          t = t - 1;

          setTime(t);
        } else {
          clearInterval(interval);
          setSeconds(false);
        }
      }, 1000);
      setRefresh(!refresh);
    }
  };

  useEffect(function () {
    myTimer();
  }, []);

  const handleverify = (e) => {
    e.preventDefault();
    console.log("getOTP", getInputOTP);
    console.log("OTP", OTP);
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
            {/* <div className="row justify-content-center"> */}
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
                    boxShadow: "1px 2px 9px #000",
                  }}
                >
                  <div className="card-body p-4">
                    <div className="text-right">
                      <h4
                        className="text-uppercase mt-0"
                        style={{ fontSize: 23, fontWeight: "bold" }}
                      >
                        Verify OTP
                      </h4>
                    </div>
                    <form class="was-validated">
                      <div className="mb-2 w-100">
                        {/* <label for="simpleinput" class="form-label">
                          Enter OTP
                        </label> */}
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
                      <div className="d-grid text-center">
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#3742fa",
                            color: "white",
                            borderRadius: 12,
                          }}
                          type="submit"
                          onClick={handleverify}
                        >
                          Login
                        </button>
                      </div>
                      <label
                        for="simpleinput"
                        class="form-label"
                        style={{ fontSize: 16, fontWeight: "bolder" }}
                      >
                        Didn't recevied OTP? Resend ....{time}
                        {/* <ResendOTP
                          maxTime={30}
                          /> */}
                      </label>
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
