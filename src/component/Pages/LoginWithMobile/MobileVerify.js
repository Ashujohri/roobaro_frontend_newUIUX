import React, { useState, useEffect } from "react";
import backimg from '../../../images/background.png';
// import { useHistory } from "react-router-dom";
// import { postDataAxios } from "../../../services/FetchNodeServices";
import OTPInput, { ResendOTP } from "otp-input-react";
import swal from "sweetalert";

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


export default function MobileVerify(props) {
  // const history = useHistory();
  const navigate = useNavigate();
  const location = useLocation();
  const [OTP, setOTP] = useState("");
  const [getLoading, setLoading] = useState(false);
  const [inputOTP, setInputOtp] = useState(false);
  var [time, setTime] = useState(10);
  var [refresh, setRefresh] = useState(false);
  var [seconds, setSeconds] = useState(true);
  var interval;

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
  console.log("location hooks", location.state)
 

  useEffect(function () {
    myTimer();

  }, []);

  // window.history.back(0);
  //   useEffect(() => {
  //     chkToken();
  //   }, [props]);

  //   const chkToken = async () => {
  //     const token = localStorage.getItem("token");
  //     const tempToken = localStorage.getItem("tempToken");
  //     if (!token && !tempToken) {
  //       navigate("/LoginMobile", { replace: true });
  //     } else if (!tempToken) {
  //       // console.log("in else if condition", tempToken);
  //       navigate("/LoginMobile", { replace: true });
  //     }
  //   };

  //   const handleDashborad = (option) => {
  //     navigate("/", { replace: true });
  //   };

  //   function generateOTP() {
  //     // Declare a string variable
  //     // which stores all string
  //     var string = "0123456789";
  //     let OTP = "";

  //     // Find the length of string
  //     var len = string.length;
  //     for (let i = 0; i < 4; i++) {
  //       OTP += string[Math.floor(Math.random() * len)];
  //     }
  //     // return OTP;
  //     console.log("OTP===========102", OTP);
  //     return OTP;
  //   }

  //   const handleResend = async (e) => {
  //     localStorage.removeItem("otp");
  //     try {
  //       // e.preventDefault();
  //       var userData = JSON.parse(localStorage.getItem("user"));
  //       var tempOTP = generateOTP();
  //       var body = {
  //         mobile: userData.mobile,
  //         otp: tempOTP,
  //       };
  //       localStorage.setItem("otp", JSON.stringify(tempOTP));
  //       var result = await postDataAxios("usersR/sendotp", body);
  //       if (result.result) {
  //         swal({
  //           title: `OTP sent again`,
  //           icon: "success",
  //           button: "ok",
  //         });
  //       }
  //     } catch (error) {
  //       console.log("error in catch", error);
  //     }
  //   };

  //   const handleVerify = async (e) => {
  //     e.preventDefault();
  //     const token = localStorage.getItem("tempToken");
  //     const tempOTP = JSON.parse(localStorage.getItem("otp"));
  //     console.log("tempOTP", tempOTP);
  //     if (tempOTP == OTP) {
  //       localStorage.setItem("token", token);
  //       localStorage.removeItem("tempToken");
  //       handleDashborad(1);
  //       // window.location.reload();
  //     } else {
  //       swal({
  //         title: `Invalid Otp`,
  //         icon: "error",
  //         button: "ok",
  //       });
  //     }
  //   };

  // console.log("props======",props.location)
  const verifyOtp = () => {
    alert(inputOTP + " " + location.state.otp);
    if (location.state.otp == inputOTP) {
      alert('matched')
    }
    else {
      alert('Notmatched')
    }
  }
  //   if (props.generatedOtp == inputOtp) {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Done...',
  //       text: 'Matched'
  //     })
  //   }
  //   else {
  //     Swal.fire({
  //     icon: 'error',
  //       title: 'Oops...',
  //       text: 'NotMatched!',
  //     })
  //   }
  // }
  console.table(JSON.parse(location.state.data));

  const handleverify = () => {
    localStorage.setItem("roleName", location.state.roleName)
    localStorage.setItem("data", location.state.data)
    localStorage.setItem("scopes", location.state.scopes)
    localStorage.setItem("token", location.state.token)
    localStorage.setItem("status", location.state.status)
    navigate({ pathname: `/` });
  }



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
                <div className="card mt-2" style={{ backgroundColor: "white", borderRadius: 15, boxShadow: '1px 2px 9px #000' }}>
                  <div className="card-body p-4">
                    <div className="text-right">
                      <h4 className="text-uppercase mt-0" style={{ fontSize: 23, fontWeight: 'bold' }}>Verify OTP</h4>
                    </div>
                    <form class="was-validated">
                      <div className="mb-2 w-100" >
                        {/* <label for="simpleinput" class="form-label">
                          Enter OTP
                        </label> */}
                        <div>
                          <OTPInput
                            value={inputOTP}
                            onChange={setInputOtp}
                            autoFocus
                            OTPLength={4}
                            otpType="number"
                            disabled={false}
                            inputStyles={{ width: "70%", borderRadius: 5, height: 35 }}

                            secure

                          />
                        </div>
                      </div>
                      {/* <div className="mb-2">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          className="form-control"
                          type="password"
                          required=""
                          id="password"
                          placeholder="Enter your password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div> */}
                      {/* <div className="mb-2">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkbox-signin"
                            defaultChecked=""
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkbox-signin"
                          >
                            Remember me
                          </label>
                        </div>
                      </div> */}
                      <div className="d-grid text-center">
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#3742fa",
                            color: "white", borderRadius: 12
                          }}
                          type="submit"
                          onClick={handleverify}

                        >
                          Login
                        </button>
                      </div>
                      <label for="simpleinput" class="form-label" style={{ fontSize: 16, fontWeight: 'bolder' }}>
                        Didn't recevied  OTP? Resend ....{time}
                        {/* <ResendOTP
                          maxTime={30}
                          /> */}
                      </label>

                      {/* <div className="mb-2">
                        
                      </div> */}

                    </form>
                  </div>
                  {/* end card-body */}
                </div>
              )}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
