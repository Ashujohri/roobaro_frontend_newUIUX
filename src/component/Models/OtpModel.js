import React, { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import OtpInput from "react18-input-otp";
import "../style.css";

export default function OtpModel(props) {
  //  alert(OTP)

  const handleClose = () => {
    props.setOpen(true);
  };
  // const handleClick = () =>{
  //   if(props.otp==OTP){

  //   }else{

  //   }
  // }

  return (
    <div>
      <Modal
        open={props.open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onClick={handleClose}>
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
          <label
            for="simpleinput"
            class="form-label"
            style={{ fontSize: 10, fontWeight: "bold", fontWeight: 500 }}
          >
            We have sent an OTP to visitor mobile number
          </label>

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
              value={props.OTP}
              onChange={props.setOTP}
              numInputs={4}
              isSuccessed={true}
              successStyle="success"
              // isInputSecure

              inputStyle={{ width: "70%", borderRadius: 5, height: 35 }}
            />
          </div>
          {props.error && props.OTP.length <= 0 ? (
            <div style={{ textAlign: "left", color: "red" }}>{props.error}</div>
          ) : (
            <></>
          )}

          <div
            style={{ display: "flex", justifyContent: "left", marginTop: 10 }}
          >
            <Button
              style={{
                backgroundColor: "#e67e22",
                color: "#fff",
                width: 90,
                borderRadius: 3,
              }}
              onClick={() => {
                props.handleSubmit();
              }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  height: 190,
  borderRadius: 2,
  bgcolor: "background.paper",

  p: 2,
  // borderRadius: 30;
};
