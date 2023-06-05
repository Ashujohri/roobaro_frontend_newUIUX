import React from "react";
import "./App.css";
import AdminRouter from "./AdminRouter";
import OtpModel from "./component/Models/OtpModel";

import Form from "./component/MultipleInput";
import AddRemoveMultipleInputFields from "./component/MultipleInput";
import MobileVerify from "./component/Pages/LoginWithMobile/MobileVerify";
import Bread from '../src/component/Bread'

export default function App(props) {
  //  const [open, setOpen] = React.useState(true)

  return (
    <>
      <div>
        <AdminRouter />
      </div>

      {/* <div>
      
      <Bread/>
    </div> */}
    </>
  );
}
