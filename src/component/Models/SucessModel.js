import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import logo from "../../images/sucessful.gif";

import { useNavigate } from "react-router-dom";

export default function SucessModel(props) {
  const navigate = useNavigate();
  // alert(props.open)
  // console.log(props.open);

  const handleClose = () => {
    props.setOpen(false);
    // navigate({ pathname: `/Dashboard` });
  };

  return (
    <div>
      <Modal
        open={props.open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img style={{ width: "60%" }} src={logo} />
          </div>

          <div
            style={{
              fontSize: 14,
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
            }}
          >
            Appoinment Schedule has been updated
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <Button
              style={{ backgroundColor: "#e67e22", color: "#fff" }}
              onClick={handleClose}
            >
              Thank you
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
  width: 350,
  height: 330,
  borderRadius: 5,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
  // borderRadius: 30;
};
