import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import logo from "../../images/app.gif";
import Topbar from "../../component/Header/Topbar";
import ListItem from "../../component/Dashboard/ListItem";
import SucessModel from "./SucessModel";
import "../style.css";
export default function AppoinmentModel(props) {
  const [open, setOpen] = useState(true);
  const [successOpen, setSuccessOpen] = useState(false);
  const [fileNameShow, setFileNameShow] = useState(false);
  const [fileError, setFileError] = useState("");

  const handleOpen = () => {
    setOpen(false);
    setSuccessOpen(true);
  };
  // alert(fileName)
  const handleClose = () => setOpen(false);

  const triggerValidation = (event) => {
    var rr = event;
    var lastFive = rr.substr(rr.length - 4);

    if (".csv" == lastFive) {
      setFileNameShow(true);
    } else {
      setFileError("This file format is not acceptable");
      setFileNameShow(false);
    }
    // var regex = new RegExp("(.*?)\.(csv)$");
    // if (!(regex.test(event.value.toLowerCase()))) {
    //   event.value = '';
    //   alert('Please select correct file format');
    // }
  };
  return (
    <div>
      <div id="wrapper">
        <Topbar />
        <ListItem />
        <div class="content-page">
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img style={{ width: "55%" }} src={logo} />
              </div>

              <div
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                  color: "black",
                }}
              >
                Appoinment Schedule
              </div>

              <div
                style={{
                  fontSize: 12,
                  margin: 10,
                  width: "58%",
                  marginTop: "9%",
                }}
              >
                Upload Appoinments
                <Button
                  style={{
                    // background: "#f2f2f2",
                    // borderColor: "#000",
                    fontFamily: "Poppins",
                    color: "#90979f",
                    fontWeight: 600,
                    fontSize: 14,
                    border: 2,
                    marginTop: 2,
                    width: 250,
                    marginRight: 100,
                  }}
                  variant="outlined"
                  // component="sss"
                >
                  <input
                    accept=".csv"
                    name="uploadDocument"
                    multiple
                    type="file"
                    id="choose-file"
                    onChange={(event) => {
                      triggerValidation(event.target.value);
                    }}
                  />
                  {/* <input
                  hidden
                    name="uploadDocument"
                    type="file"
                    id="choose-file"
                    accept=".csv"
                    
                    onChange={(event) => {
                      triggerValidation(event.target.value);
                    }}
                  /> */}
                  {/* <div class="container">

<h1 class="mt-5 mb-4">Change "<b>Choose file</b>" text with Bootstrap 5</h1>

<div class="input-group custom-file-button">
  <label class="input-group-text" for="inputGroupFile">Your Custom Text</label>
  <input type="file" class="form-control" id="inputGroupFile"/>
</div>
</div> */}
                  {/* <input
                    id="upload"
                    ref="upload"
                    type="file"
                    accept=".csv"
                    onChange={(event) => {
                      // this.readFile(event);
                      // this.value = null;
                    }}
                  /> */}
                </Button>
                <div
                  style={{ fontSize: 12, width: "80%", fontFamily: "cursive" }}
                >
                  only CSV file accepted
                </div>
                <div
                  style={{
                    fontSize: 12,
                    width: 200,
                    fontFamily: "cursive",
                    background: "pink",
                    color: "red",
                  }}
                >
                  {fileNameShow == false && fileError}
                </div>
              </div>

              <div style={{ marginLeft: "30%", marginTop: 15 }}>
                <Button
                  disabled={fileNameShow == true ? false : true}
                  style={{
                    backgroundColor: "#e67e22",
                    color: "#fff",
                    width: 17,
                    height: 30,
                    fontSize: 10,
                  }}
                  onClick={handleOpen}
                >
                  Submit
                </Button>
                <Button
                  style={{
                    backgroundColor: "grey",
                    color: "#fff",
                    width: 17,
                    height: 30,
                    marginLeft: 4,
                    fontSize: 10,
                  }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </Box>
          </Modal>
          <SucessModel setOpen={setSuccessOpen} open={successOpen} />
        </div>
      </div>
    </div>
  );
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  height: 400,
  borderRadius: 5,
  bgcolor: "background.paper",
  // backgroundColor:'green',

  // boxShadow: 24,
  p: 4,
  // borderRadius: 30;
};
