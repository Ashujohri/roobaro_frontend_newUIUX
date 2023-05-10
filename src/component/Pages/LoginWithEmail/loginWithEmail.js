import React, { useState, useEffect } from "react";
import backimg from "../../../images/background.png";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { postDataAxiosWithoutToken } from "../../Services/NodeServices";
import swal from "sweetalert";

export default function LoginWithEmail(props) {
  const navigate = useNavigate();
  const [getEmail, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [getLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checkvalidate, setcheckvalidate] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    chkToken();
  }, [props]);

  const chkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/AdminLogin", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  const handleForgot = () => {
    navigate({ pathname: `/ForgotPassword` });
  };

  const handleMobileLogin = () => {
    navigate({ pathname: `/LoginWithMobile` });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setcheckvalidate(true);
    } else {
      handleLogin();
    }
    setValidated(true);
  };

  const handleLogin = async () => {
    try {
      let body = {
        email: getEmail,
        password: Password,
      };
      let result = await postDataAxiosWithoutToken("users/authenticate", body);
      if (result.status === true) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("roleName", JSON.stringify(result.roleName));
        localStorage.setItem("userData", JSON.stringify(result.data));
        navigate("/dashboard", { replace: true });
      } else {
        swal({
          title: `${result.message}`,
          icon: "error",
          button: "ok",
        });
      }
    } catch (error) {
      console.log("error 🔥🔥", error);
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
              <div className="loginwidth">
                <div className="text-center">
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
                      borderRadius: 3,
                      boxShadow: "1px 2px 2px #000",
                    }}
                  >
                    <div className="card-body p-4">
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                      >
                        <Row className="mb-3 row">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom03"
                          >
                            <Form.Label style={{ color: "#000", fontSize: 14 }}>
                              Email
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Email"
                              onChange={(event) => setEmail(event.target.value)}
                              // value={getEmail}
                              pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Enter valid email
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <Row className="mb-3 row">
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom03"
                          >
                            <Form.Label style={{ color: "#000", fontSize: 14 }}>
                              Password
                            </Form.Label>
                            <Form.Control
                              required
                              type="password"
                              placeholder="Password"
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                              // value={Password}
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Enter password please
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Row>

                        <div className="col-12">
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
                        </div>
                      </Form>

                      <div className="row">
                        <div className="col-6">
                          <p
                            style={{
                              fontSize: 13,
                              fontFamily: "Poppins",
                              fontWeight: 600,
                              cursor: "pointer",
                              // margin: 10,
                            }}
                            className="p-2"
                          >
                            <a href={false}>ForgotPassword ?</a>
                          </p>
                        </div>
                        <div className="col-6">
                          <p
                            style={{
                              fontSize: 13,
                              fontFamily: "Poppins",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                            className="p-2"
                          >
                            <a href={false} onClick={() => handleMobileLogin()}>
                              Sign-In Mobile
                            </a>
                            <i className="fe-smartphone" />
                          </p>
                        </div>
                      </div>
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
