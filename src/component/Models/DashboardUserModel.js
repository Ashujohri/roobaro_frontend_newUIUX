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
import Swal from "sweetalert2";
import moment from "moment";
import { getDataAxios, postDataAxios } from "../Services/NodeServices";
import { Trans } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DashboardUserModel(props) {
  var userData = JSON.parse(localStorage.getItem("userData"));
  const [open, setOpen] = React.useState(false);
  const [getLocation, setLocation] = React.useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

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
      title: <Trans i18nKey="Public_Meetings"> Public meetings </Trans>,
      color: "#3786eb",
      backgroundColor: "#ecf4fe",
      img: PublicMeetings,
    },
    {
      id: "2",
      iconName: "",
      title: <Trans i18nKey="field_visits"> Field Visits </Trans>,
      color: "#f9aa4b",
      backgroundColor: "#fff6ec",
      img: Visit,
    },
  ];
  const data1 = [
    {
      id: "3",
      iconName: "",
      title: <Trans i18nKey="Mantralaya"> Mantralaya </Trans>,
      color: "#f3747f",
      backgroundColor: "#fcdee0",
      img: Mantralaya,
    },
    {
      id: "4",
      iconName: "",
      title: <Trans i18nKey="Vidhansabha"> Vidhansabha </Trans>,
      color: "#18b797",
      backgroundColor: "#c5ede5",
      img: Vidhansabha,
    },
  ];
  const data2 = [
    {
      id: "5",
      iconName: "",
      title: <Trans i18nKey="Jasdan"> Jasdhan </Trans>,
      color: "#d680e6",
      backgroundColor: "#f6d9ff",
      img: Jasdan,
    },
    {
      id: "6",
      iconName: "",
      title: <Trans i18nKey="Residence"> Residence </Trans>,
      color: "#2fc2e1",
      backgroundColor: "#d5f3f9",
      img: Residence,
    },
  ];

  const fetchUserData = async () => {
    try {
      const result = await getDataAxios(`users/fetchUserDetail/${userData.id}`);
      console.log(
        "result in userDetail in VisitorAdd",
        result.result[0].user_location
      );
      if (result.status === true) {
        setLocation(result.result[0].user_location);
      }
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const handleSubmit = async (titleLocation) => {
    console.log("titleLocation", titleLocation);
    try {
      let body = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        mobile_number: userData.mobile_number,
        status: userData.status,
        minister_id: userData.minister_id,
        created_at: moment(userData.created_at).format("YYYY-MM-DD HH:mm:ss"),
        role_id: userData.role_id,
        language_id: userData.language_id ? userData.language_id : null,
        user_address: userData.user_address,
        user_organization: userData.user_organization,
        user_location: titleLocation,
        picture: userData.picture,
        updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      let result = await postDataAxios(`users/updateUser/${userData.id}`, body);
      if (result.status === true) {
        Swal.fire({ icon: "success", text: "Location select" });
        handleClose();
      } else {
        Swal.fire({ icon: "error", text: result.message });
      }
    } catch (error) {
      console.log("error in catch handleSubmit", error);
    }
  };

  return (
    <div>
      <span
        onClick={() => {
          handleClickOpen();
        }}
        style={{ cursor: "pointer", color: "black", fontWeight: 550 }}
      >
        {getLocation != ""
          ? getLocation
          : userData.user_location != ""
          ? userData.user_location
          : "Office"}
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
            <Trans i18nKey="On_field"> On-Field </Trans>
          </DialogTitle>
          <div style={{ display: "flex", flexDirection: "row", padding: 5 }}>
            {data.map((item) => {
              return (
                <Button
                  onClick={() => {
                    setLocation(item.title);
                    handleSubmit(item.title);
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

          <DialogTitle style={{ padding: 0 }}>
            <Trans i18nKey="office"> Office </Trans>
          </DialogTitle>
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
                      setLocation(item.title);
                      handleSubmit(item.title);
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
                      setLocation(item.title);
                      handleSubmit(item.title);
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
