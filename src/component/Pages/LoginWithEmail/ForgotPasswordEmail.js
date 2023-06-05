import React, { useState, useEffect } from "react";
import backimg from "../../../images/background.png";

// import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Reset(props) {
  // const navigate = useNavigate();
  const [getLoginData, setLoginData] = useState([]);
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getLoading, setLoading] = useState(false);

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

  //   const handleDashborad = (option) => {
  //     navigate("/", { replace: true });
  //   };

  //   let LoginWithEmail = async (e) => {
  //     try {
  //       setLoading(true);
  //       e.preventDefault();
  //       let body = {
  //         email: getEmail,
  //         password: getPassword,
  //       };
  //       let result = await postDataAxiosWithoutToken(`usersR/PenalLogin`, body);
  //       // console.log("result of login data", result);
  //       if (result.status === true) {
  //         setLoading(false);
  //         let response = await getDataAxios(
  //           `taskpriority/display/${result.data.company_id}`
  //         );
  //         let roleResponse = await getDataAxios(
  //           `roles/newPenalRoleDisplay/${result.data.company_id}`
  //         );
  //         localStorage.setItem("Roles", JSON.stringify(roleResponse.result));
  //         localStorage.setItem("taskPirority", JSON.stringify(response.result));
  //         localStorage.setItem("user", JSON.stringify(result.data));
  //         localStorage.setItem("token", result.token);
  //         localStorage.setItem("scopes", JSON.stringify(result.scopes));
  //         handleDashborad(1);
  //       } else {
  //         swal({
  //           title: `Something went wrong`,
  //           icon: "error",
  //           button: "ok",
  //         });
  //       }
  //     } catch (error) {
  //       console.log("error in catch", error);
  //     }
  //   };

  //   const handleLoginMobile = () => {
  //     navigate({ pathname: `/LoginMobile` });
  //   };

  //   const handleForgot = () => {
  //     navigate({ pathname: `/ForgotPassword` });
  //   };

  // return (
  //     <>
  //         <div

  //          style={{
  //             backgroundImage: `url(${backimg})`,
  //             backgroundSize: "cover",
  //             backgroundPosition: "center",
  //           }}

  //         >

  //             <div>
  //                 <div
  //                     className="container"
  //                     style={{
  //                         height: "100vh",
  //                         display: "flex",
  //                         flexWrap: "wrap",
  //                         justifyContent: "center",
  //                         alignItems: "center",

  //                     }}
  //                 >

  //                     <div className="row justify-content-center">
  //                     <div className="loginwidth" >
  //                          <div className="text-center mt-4" >
  //                             <a href={false}>
  //                                 <img
  //                                     src="images/Logo.png"
  //                                     alt=""
  //                                     height={40}
  //                                     className="mx-auto"
  //                                 />
  //                             </a>
  //                         </div>
  //                         {getLoading ? (
  //                            <div className="card mt-2" >
  //                            <div className="card-body p-4" style={{backgroundColor:'red'}}>

  //                                <form >
  //                                     <div className="mb-2">
  //                                        <label htmlFor="emailaddress" className="form-label">
  //                                            Email address
  //                                        </label>
  //                                        <input
  //                                         style={{

  //                                            borderRadius:10
  //                                        }}
  //                                            className="form-control"
  //                                            type="email"
  //                                            id="emailaddress"
  //                                            required=""
  //                                            placeholder="Enter your email"
  //                                            onChange={(e) => setEmail(e.target.value)}
  //                                        />
  //                                    </div>
  //                                     <div className="mb-2" >
  //                                        <label htmlFor="password" className="form-label">
  //                                            Password
  //                                        </label>
  //                                        <input
  //                                        style={{

  //                                            borderRadius:10
  //                                        }}
  //                                            className="form-control"
  //                                            type="password"
  //                                            required=""
  //                                            id="password"
  //                                            placeholder="Enter your password"
  //                                            onChange={(e) => setPassword(e.target.value)}
  //                                        />
  //                                    </div>
  //                                    {/* <div className="mb-2">
  //                                        <div className="form-check">
  //                                            <input
  //                                                type="checkbox"
  //                                                className="form-check-input"
  //                                                id="checkbox-signin"
  //                                                defaultChecked=""
  //                                            />
  //                                            <label
  //                                                className="form-check-label"
  //                                                htmlFor="checkbox-signin"
  //                                            >
  //                                                Remember me
  //                                            </label>
  //                                        </div>
  //                                    </div> */}
  //                                    {/* <div className="d-grid text-center">
  //                                        <button
  //                                            className="btn"
  //                                            style={{
  //                                                backgroundColor: "#3742fa",
  //                                                color: "white",
  //                                                borderRadius:10
  //                                            }}
  //                                            type="submit"
  //                                        >
  //                                            Login
  //                                        </button>
  //                                    </div> */}
  //                                </form>
  //                                <div className="row mt-3">
  //                                    <div
  //                                        className="col-6 col-md-6"
  //                                        style={{ cursor: "pointer" }}
  //                                    >
  //                                        <p>
  //                                            <a
  //                                                href={false}
  //                                                className="text-muted font-11"
  //                                            // onClick={handleForgot}
  //                                            >
  //                                                <i className="fa fa-lock me-1" />
  //                                                Forgot your password?
  //                                            </a>
  //                                        </p>
  //                                    </div>

  //                                     <div
  //                                        className="col-6 col-md-6 text-center"
  //                                        style={{ cursor: "pointer" }}
  //                                    >
  //                                        <p style={{ textAlign: "right" }}>
  //                                            <a
  //                                                href={false}
  //                                                className="text-muted font-11"
  //                                            // onClick={handleLoginMobile}
  //                                            >
  //                                                <i className="fa fa-lock me-1" />
  //                                                SignIn with mobile
  //                                            </a>
  //                                        </p>
  //                                    </div>
  //                                    {/* end col */}
  //                                </div>
  //                            </div>
  //                            {/* end card-body */}
  //                        </div>
  //                         ) : (
  //                             <div className="card mt-2">
  //                                 <div className="card-body p-4">

  //                                     <form >
  //                                         <div className="mb-2">
  //                                             <label htmlFor="emailaddress" className="form-label">
  //                                                 Email address
  //                                             </label>
  //                                             <input
  //                                              style={{

  //                                                 borderRadius:10
  //                                             }}
  //                                                 className="form-control"
  //                                                 type="email"
  //                                                 id="emailaddress"
  //                                                 required=""
  //                                                 placeholder="Enter your email"
  //                                                 onChange={(e) => setEmail(e.target.value)}
  //                                             />
  //                                         </div>
  //                                         <div className="mb-2" >
  //                                             <label htmlFor="password" className="form-label">
  //                                                 Password
  //                                             </label>
  //                                             <input
  //                                             style={{

  //                                                 borderRadius:10
  //                                             }}
  //                                                 className="form-control"
  //                                                 type="password"
  //                                                 required=""
  //                                                 id="password"
  //                                                 placeholder="Enter your password"
  //                                                 onChange={(e) => setPassword(e.target.value)}
  //                                             />
  //                                         </div>
  //                                         <div className="mb-2">
  //                                             <div className="form-check">
  //                                                 <input
  //                                                     type="checkbox"
  //                                                     className="form-check-input"
  //                                                     id="checkbox-signin"
  //                                                     defaultChecked=""
  //                                                 />
  //                                                 <label
  //                                                     className="form-check-label"
  //                                                     htmlFor="checkbox-signin"
  //                                                 >
  //                                                     Remember me
  //                                                 </label>
  //                                             </div>
  //                                         </div>
  //                                         <div className="d-grid text-center">
  //                                             <button
  //                                                 className="btn"
  //                                                 style={{
  //                                                     backgroundColor: "#3742fa",
  //                                                     color: "white",
  //                                                     borderRadius:10
  //                                                 }}
  //                                                 type="submit"
  //                                             >
  //                                                 Login
  //                                             </button>
  //                                         </div>
  //                                     </form>
  //                                     <div className="row mt-3">
  //                                          <div
  //                                             className="col-6 col-md-6"
  //                                             style={{ cursor: "pointer" }}
  //                                         >
  //                                             <p>
  //                                                 <a
  //                                                     href={false}
  //                                                     className="text-muted font-11"
  //                                                 // onClick={handleForgot}
  //                                                 >
  //                                                     <i className="fa fa-lock me-1" />
  //                                                     Forgot your password?
  //                                                 </a>
  //                                             </p>
  //                                         </div>

  //                                          <div
  //                                             className="col-6 col-md-6 text-center"
  //                                             style={{ cursor: "pointer" }}
  //                                         >
  //                                             <p style={{ textAlign: "right" }}>
  //                                                 <a
  //                                                     href={false}
  //                                                     className="text-muted font-11"
  //                                                 // onClick={handleLoginMobile}
  //                                                 >
  //                                                     <i className="fa fa-lock me-1" />
  //                                                     SignIn with mobile
  //                                                 </a>
  //                                             </p>
  //                                          </div>
  //                                          {/* end col */}
  //                                     </div>
  //                                 </div>
  //                                 {/* end card-body */}
  //                             </div>
  //                         )}
  //                     </div>
  //                     </div>
  //                 </div>
  //             </div>
  //         </div>
  //     </>
  // );
  return (
    <>
      <div style={{ backgroundColor: "#f7f7f7" }}>
        <div
          style={{
            backgroundImage: `url(${backimg})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
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
                    <img
                      src="images/Logo.png"
                      alt=""
                      height={40}
                      className="mx-auto"
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
                      height: "20%",
                      width: "90%",
                      borderRadius: 10,
                      boxShadow: "1px 2px 9px #000",
                      marginBottom: 20,
                    }}
                  >
                    <div className="card-body p-4">
                      <form>
                        <div className="mb-2">
                          <label htmlFor="emailaddress" className="form-label">
                            Email address
                          </label>
                          <input
                            className="form-control"
                            type="email"
                            id="emailaddress"
                            required=""
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="d-grid text-center">
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#005db6",
                              color: "white",
                              borderRadius: 10,
                            }}
                            type="submit"
                          >
                            Reset Password
                          </button>
                        </div>
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
      </div>
    </>
  );
}
