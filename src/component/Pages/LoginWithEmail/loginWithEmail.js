import React, { useState, useEffect } from "react";
import backimg from "../../../images/bg.png";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {
  getDataAxios,
  postDataAxios,
  postDataAxiosWithoutToken,
} from "../../Services/NodeServices";
import swal from "sweetalert";
import { Trans, useTranslation } from "react-i18next";
import { InputGroup } from "react-bootstrap";

export default function LoginWithEmail(props) {
  const navigate = useNavigate();
  const [getEmail, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [getLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checkvalidate, setcheckvalidate] = useState(false);
  const [validated, setValidated] = useState(false);
  const { t, i18n } = useTranslation();
  const [getLanguageData, setLanguageData] = useState([]);
  const [getLanguage, setLanguage] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  useEffect(() => {
    chkToken();
    fetchLanguages();
  }, [props]);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const changeLanguage = async (lang) => {
  //   try {
  //     var temp = "";
  //     let result = await postDataAxios(`label/displayLanguageLabels`, {
  //       id: lang,
  //     });
  //     if (result.status === true) {
  //       var obj = {};
  //       result.result.map((item) => {
  //         obj[item.Labels] = item.label_translation;
  //       });
  //       localStorage.setItem("lang", JSON.stringify(obj));
  //       // i18n.changeLanguage(localStorage.getItem("lang"));
  //       if (lang == 2) {
  //         temp = "Hindi";
  //       } else if (lang == 3) {
  //         temp = "Gujrati";
  //       } else {
  //         temp = "English";
  //       }
  //       i18n.changeLanguage(`${temp}`);
  //     }
  //   } catch (error) {
  //     console.log("error in catch changeLan", error);
  //   }
  // };

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

  const fetchLanguages = async () => {
    try {
      let result = await getDataAxios(`language/displayLanguage`);
      if (result.status === true) {
        setLanguageData(result.result);
      }
    } catch (error) {
      console.log("error in catch language", error);
    }
  };

  const showLanguages = () => {
    return getLanguageData.map((item) => {
      return (
        <option value={item.id} key={item.id}>
          {item.language_name}
        </option>
      );
    });
  };

  return (
    <>
      <div style={{ backgroundColor: "#f7f7f7" }}>
        <div
          style={{
            backgroundImage: `url(${backimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <div
            className="col-3 p-2"
            style={{ display: "block", float: "right" }}
          >
            <select
              class="form-select"
              aria-label="Default select example"
              value={getLanguage}
              onChange={(e) => {
                setLanguage(e.target.value);
                changeLanguage(e.target.value);
              }}
            >
              <option selected>Languages</option>
              {showLanguages()}
            </select>
          </div> */}
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
                              <Trans i18nKey="Email">Email</Trans>
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

                        <Row
                          className="mb-3 row"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Group
                            as={Col}
                            md="12"
                            controlId="validationCustom03"
                          >
                            <Form.Label style={{ color: "#000", fontSize: 14 }}>
                              <Trans i18nKey="Password"> Password </Trans>
                            </Form.Label>
                            <div
                              className="input-group input-group-merge"
                              style={{
                                border: "0.2px solid #ced4da",
                                borderRadius: 3,
                              }}
                            >
                              <Form.Control
                                required
                                type={values.showPassword ? "text" : "password"}
                                style={{ border: "0px solid #000" }}
                                placeholder="Password"
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                                value={Password}
                              />
                              <div
                                className="input-group-text"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {values.showPassword ? (
                                  <i className="fe-eye" />
                                ) : (
                                  <i className="fe-eye-off" />
                                )}
                              </div>
                            </div>
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
                              <Trans i18nKey="login"> Login </Trans>
                            </button>
                          </div>
                        </div>
                      </Form>

                      <div className="row">
                        <div className="col-6">
                          <p
                            style={{
                              fontSize: 12,
                              fontFamily: "Poppins",
                              fontWeight: 600,
                              cursor: "pointer",
                              // margin: 10,
                            }}
                            className="p-2"
                          >
                            <a href={false}>
                              {" "}
                              <Trans i18nKey="forgot_password">
                                {" "}
                                ForgotPassword ?{" "}
                              </Trans>
                            </a>
                          </p>
                        </div>
                        <div className="col-6">
                          <p
                            style={{
                              fontSize: 12,
                              fontFamily: "Poppins",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                            className="p-2"
                          >
                            <a href={false} onClick={() => handleMobileLogin()}>
                              <Trans i18nKey="Sign-In_With_Mobile">
                                {" "}
                                Sign-In With Mobile{" "}
                              </Trans>
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
