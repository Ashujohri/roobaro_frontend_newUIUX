import React, { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import OTPInput, { ResendOTP } from "otp-input-react";


export default function OtpModel(props) {

//  alert(OTP)

  const handleClose = () =>{
    props.setOpen(true)
  }
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
          {/* <div style={{marginTop:10,display:'flex',justifyContent:'center',alignItems:'center'}}>

      
                   </div> */}
          <div className="text-right">
            <h4
              className="text-uppercase mt-0"
              style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 ,fontWeight:800}}
            >
              Verify OTP
            </h4>
          </div>
          <label
            for="simpleinput"
            class="form-label"
            style={{ fontSize: 10, fontWeight: "bold",fontWeight:500 }}
          >
            We have sent an OTP to visitor mobile number
            {/* <ResendOTP
                          maxTime={30}
                          /> */}
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
            <OTPInput
              value={props.OTP}
              onChange={props.setOTP}
              autoFocus
              OTPLength={4}
              otpType="number"
              disabled={false}
              inputStyles={{ width: "70%", borderRadius: 5 }}
              secure
            />
          </div>
          {props.error && props.OTP.length<=0?
      <div style={{textAlign:"left",color:'red',marginBottom:18}}>{props.error}</div>:<></>}

          <div
            style={{ display: "flex", justifyContent: "left", marginTop: 15 }}
          >
            <Button
              style={{
                backgroundColor: "#e67e22",
                color: "#fff",
                width: 90,
                borderRadius: 3,
              }}
              onClick={()=>{props.yesClick();}}
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
  height: 210,
  borderRadius: 5,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 3,
  // borderRadius: 30;
};
