import React, { useState, useEffect } from "react";
import backimg from "../../../images/background.png";
// import { useHistory } from "react-router-dom";
// import { postDataAxios } from "../../../services/FetchNodeServices";
import OTPInput, { ResendOTP } from "otp-input-react";
import swal from "sweetalert";
import OtpInput from "react18-input-otp";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import "../../style.css";

export default function MobileVerify(props) {
  // const history = useHistory();
  const navigate = useNavigate();
  const location = useLocation();
  const [OTP, setOTP] = useState("");
  const [getLoading, setLoading] = useState(false);
  const [inputOTP, setInputOtp] = useState(false);
  var [time, setTime] = useState(10);
  var [refresh, setRefresh] = useState(false);
  // var [seconds, setSeconds] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [resendOtp, setResendOtp] = useState(false);
  const [error, setError] = useState(false);
  var interval;

  // alert(startTimer)
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

  const resendOTP = () => {
    setMinutes(0);
    setSeconds(30);
  };

  // console.log("location hooks", location.state.handleotpE);

  // useEffect(function () {
  //   myTimer();
  // }, []);

  // useEffect(
  //   function () {
  //     myTimer();
  //   },
  //   [resendOtp]
  // );

  const ResendOTP = async (e) => {
    // myTimer();
    // e.preventDefault();
    // alert('hhh')
    var otp = parseInt(Math.random() * 8999) + 1000;
    setResendOtp(otp);
  };

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
  // const reSendOtp=()=>{
  //   var otp = parseInt(Math.random() * 8999) + 1000;
  //   alert(otp)
  // }

  // console.log("props======",props.location)
  const verifyOtp = () => {
    alert(inputOTP + " " + location.state.otp);
    if (location.state.otp == inputOTP) {
      alert("matched");
    } else {
      alert("Notmatched");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (OTP.length == 0) {
      setError(true);
    }
  };
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
  // console.table(JSON.parse(location.state.handleotp));

  const handleverify = () => {
    localStorage.setItem("roleName", location.state.roleName);
    localStorage.setItem("data", location.state.data);
    localStorage.setItem("scopes", location.state.scopes);
    localStorage.setItem("token", location.state.token);
    localStorage.setItem("status", location.state.status);
    navigate({ pathname: `/` });
  };

  return (
    <>
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
                          fontWeight: 800,
                        }}
                      >
                        Verify OTP
                      </h4>
                    </div>
                    <form class="was-validated">
                      <div className="mb-2 w-100">
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <OtpInput
                            value={OTP}
                            onChange={setOTP}
                            numInputs={4}
                            isSuccessed={true}
                            successStyle="success"
                            // isInputSecure

                            inputStyle={{
                              width: "80%",
                              borderRadius: 5,
                              height: 35,
                            }}
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
                          onClick={handleSubmit}
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

                      {/* <div
                        style={{
                          fontSize: 14,
                          color: "black",
                          marginTop: 10,
                          flexDirection: "row",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div>Didn't received OTP?</div>

                        <div
                          style={{
                            cursor: "pointer",
                            color: "orange",
                            marginLeft: 10,
                            fontSize: 14,
                          }}
                          onClick={() => {
                            {
                              resendOTP();
                            }
                          }}
                        >
                          Resend
                        </div>
                      </div> */}
                          <div style={{flexDirection:'row',display:'flex',justifyContent:'center'}}>
                      <div style={{cursor:'pointer'}}>
                        Didn't received OTP ?
                      </div>
                      {seconds > 0 || minutes > 0 ? (
                        <div
                          style={{
                            marginLeft: 5,
                            color: "orange",
                            fontSize: 16,
                            cursor:'pointer'
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
                            cursor:'pointer'
                          }}
                        >
                          Resend
                        </div>
                      )}
                      </div>

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

// import { useState } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import OtpInput from "react18-input-otp";
// import "../../style.css";

// export default function OtpModel(props) {
//   //  alert(OTP)

//   const handleClose = () => {
//     props.setOpen(true);
//   };
//   // const handleClick = () =>{
//   //   if(props.otp==OTP){

//   //   }else{

//   //   }
//   // }

//   return (
//     <div>
//       <Modal
//         open={props.open}
//         // onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style} onClick={handleClose}>
//           <div className="text-right">
//             <h4
//               className="text-uppercase mt-0"
//               style={{
//                 fontSize: 20,
//                 fontWeight: "bold",
//                 marginTop: 10,
//                 fontWeight: 800,
//               }}
//             >
//               Verify OTP
//             </h4>
//           </div>
//           <label
//             for="simpleinput"
//             class="form-label"
//             style={{ fontSize: 10, fontWeight: "bold", fontWeight: 500 }}
//           >
//             We have sent an OTP to visitor mobile number

//           </label>

//           <div
//             style={{
//               fontSize: 16,
//               fontWeight: "bold",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <OtpInput
//               value={props.OTP}
//               onChange={props.setOTP}
//               numInputs={4}
//               isSuccessed={true}
//               successStyle="success"
//               // isInputSecure

//               inputStyle={{ width: "70%", borderRadius: 5, height: 35 }}
//             />
//           </div>
//           {props.error && props.OTP.length<=0?
//       <div style={{textAlign:"left",color:'red'}}>{props.error}</div>:<></>}

//           <div
//             style={{ display: "flex", justifyContent: "left", marginTop: 10 }}
//           >
//             <Button
//               style={{
//                 backgroundColor: "#e67e22",
//                 color: "#fff",
//                 width: 90,
//                 borderRadius: 3,
//               }}
//               onClick={() => {
//                 props.handleSubmit();
//               }}
//             >
//               Submit
//             </Button>
//           </div>
//         </Box>
//       </Modal>
//     </div>
//   );
// }
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 370,
//   height: 190,
//   borderRadius: 2,
//   bgcolor: "background.paper",

//   p: 2,
//   // borderRadius: 30;
// };
