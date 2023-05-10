import React from "react";

export default function Topbar(props) {
  return (
    <>
      {/* Topbar Start */}
      <div className="navbar-custom">
        <ul
          className="list-unstyled topnav-menu float-end mb-0"
          style={{ width: 200 }}
        >
          <li className="d-none d-lg-block">
            <form className="app-search">
              <div className="app-search-box">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    id="top-search"
                  />
                  <button className="btn input-group-text">
                    <i className="fe-search" />
                  </button>
                </div>
              </div>
            </form>
          </li>
        </ul>
        {/* LOGO */}
        <div className="logo-box">
          <a className="logo logo-dark text-center">
            <span className="logo-lg" style={{ backgroundColor: "white" }}>
              <img src="images/logo.png" alt="" height={35} />
            </span>
            <div style={{ border: "1px solid rgba(216,220,225,1)" }}></div>
          </a>
        </div>
        <ul className="list-unstyled topnav-menu topnav-menu-left mb-0">
          <li>
            <button className="button-menu-mobile disable-btn waves-effect">
              <i className="fe-menu" />
            </button>
          </li>
          <li>
            <h4 className="page-title-main">{props.showName}</h4>
          </li>
        </ul>
        <div />
      </div>
    </>
  );
}
