import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Visit from "../../images/FiledVisits.png";
import Jasdan from "../../images/Jasdan.png";
import Mantralaya from "../../images/Mantralaya.png";
import Vidhansabha from "../../images/Vidhansabha.png";
import Residence from "../../images/Residence.png";
import PublicMeetings from "../../images/Publicmeetings.png";
import { DialogContent, DialogTitle } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DashboardUserModel(props) {
  const [open, setOpen] = React.useState(false);
  const [getLocation, setLocation] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const data = [
    {
      id: "1",
      iconName: "",
      title: "Public meetings",
      color: "#3786eb",
      backgroundColor: "#ecf4fe",
      img: PublicMeetings,
    },
    {
      id: "2",
      iconName: "",
      title: "Field Visits",
      color: "#f9aa4b",
      backgroundColor: "#fff6ec",
      img: Visit,
    },
  ];
  const data1 = [
    {
      id: "3",
      iconName: "",
      title: "Mantralaya",
      color: "#f3747f",
      backgroundColor: "#fcdee0",
      img: Mantralaya,
    },
    {
      id: "4",
      iconName: "",
      title: "Vidhansabha",
      color: "#18b797",
      backgroundColor: "#c5ede5",
      img: Vidhansabha,
    },
  ];
  const data2 = [
    {
      id: "5",
      iconName: "",
      title: "Jasdhan",
      color: "#d680e6",
      backgroundColor: "#f6d9ff",
      img: Jasdan,
    },
    {
      id: "6",
      iconName: "",
      title: "residence",
      color: "#2fc2e1",
      backgroundColor: "#d5f3f9",
      img: Residence,
    },
  ];
  //     useEffect(() => {
  //         setTimeout(() => {
  //             handleClickOpen();
  //         }, 1500);
  // }, [])

  return (
    <div>
      <span
        onClick={() => {
          handleClickOpen();
        }}
        style={{ cursor: "pointer", color: "black", fontWeight: 550 }}
      >
        {localStorage.setItem("location_type", JSON.stringify(getLocation))}
        {getLocation != "" ? getLocation : "Office"}
        <KeyboardArrowDownIcon />
      </span>

      <Dialog
        style={{
          alignSelf: "center",
          display: "flex",
          justifyContent: "center",
        }}
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogTitle
            id="alert-dialog-slide-description"
            style={{ padding: 0 }}
          >
            {"On-Field"}
          </DialogTitle>
          <div style={{ display: "flex", flexDirection: "row", padding: 5 }}>
            {data.map((item) => {
              return (
                <Button
                  onClick={() => {
                    props.setTitle(item.title);
                    handleClickOpen();
                    handleClose();
                    setLocation(item.title);
                  }}
                  style={{
                    display: "flex",
                    width: 120,
                    height: 110,
                    padding: 5,
                    background: item.backgroundColor,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: 10,
                    margin: 5,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      height: 60,
                      width: 60,
                      background: item.color,
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10,
                    }}
                  >
                    <img src={item.img} style={{ width: "60%" }} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      margin: 5,
                      height: "20%",
                      width: "100%",
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <text
                      style={{ fontSize: 10, fontWeight: "800", color: "#000" }}
                    >
                      {item.title}
                    </text>
                  </div>
                </Button>
              );
            })}
          </div>

          <DialogTitle style={{ padding: 0 }}>{"Office"}</DialogTitle>
          <div style={{ padding: 5 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {data1.map((item) => {
                return (
                  <Button
                    onClick={() => {
                      props.setTitle(item.title);
                      handleClickOpen();
                      handleClose();
                      setLocation(item.title);
                    }}
                    style={{
                      display: "flex",
                      width: 120,
                      height: 110,
                      padding: 5,
                      background: item.backgroundColor,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      borderRadius: 10,
                      margin: 5,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: 60,
                        width: 60,
                        background: item.color,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                      }}
                    >
                      <img src={item.img} style={{ width: "60%" }} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        margin: 5,
                        height: "20%",
                        width: "100%",
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <text
                        style={{
                          fontSize: 10,
                          fontWeight: "800",
                          color: "#000",
                        }}
                      >
                        {item.title}
                      </text>
                    </div>
                  </Button>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {data2.map((item) => {
                return (
                  <Button
                    onClick={() => {
                      props.setTitle(item.title);
                      handleClickOpen();
                      handleClose();
                      setLocation(item.title);
                    }}
                    style={{
                      display: "flex",
                      width: 120,
                      height: 110,
                      padding: 5,
                      background: item.backgroundColor,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      borderRadius: 10,
                      margin: 5,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: 60,
                        width: 60,
                        background: item.color,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                      }}
                    >
                      <img src={item.img} style={{ width: "60%" }} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        margin: 5,
                        height: "20%",
                        width: "100%",
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <text
                        style={{
                          fontSize: 10,
                          fontWeight: "800",
                          color: "#000",
                        }}
                      >
                        {item.title}
                      </text>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
