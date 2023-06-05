import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import logo from "../../images/question.gif";

export default function Model(props) {
  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <div>
      <Modal
        open={props.open}
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
            <img style={{ width: 180 }} src={logo} />
          </div>

          <div
            style={{
              fontSize: 15,
              color: "black",
              fontWeight: 700,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: props.width,
            }}
          >
            {props.title}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 25,
            }}
          >
            <Button
              style={{ backgroundColor: "#ff7e24", color: "#fff" }}
              onClick={props.handleSubmit}
            >
              yes
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              variant="inherit"
              onClick={handleClose}
            >
              No
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
  transform: "translate(-30%,-40%)",
  width: 345,
  height: 350,
  borderRadius: 3,
  bgcolor: "WHITE",

  p: 4,
};
