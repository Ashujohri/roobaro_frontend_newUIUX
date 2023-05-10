// var fetchLocal = JSON.parse(localStorage.getItem("roleName"));
// console.log("fetchLocal", fetchLocal);
export const sidebarMenu = [
  {
    name: "dashboard",
    label: "Dahsboard",
    // icon: <img src="images/home.png" alt="" height={15} />,
    icon: "fe-home",
  },
  fetchLocal.includes("super_admin") == true ? (
    {
      name: "minister",
      label: "Minister",
      // icon: <img src="images/profile.png" alt="" height={15} />,
      icon: "fe-users",
    }
  ) : (
    <>{null}</>
  ),

  fetchLocal.includes("super_admin") == true ? (
    {
      name: "localization",
      label: "Localization",
      icon: "mdi mdi-clipboard-list-outline",
    }
  ) : (
    <></>
  ),
  {
    name: "users",
    label: "Users",
    // icon: <img src="images/profile.png" alt="" height={15} />,
    icon: "fe-users",
  },
  {
    name: "visitors",
    label: "Visits",
    // icon: <img src="images/visits.png" alt="" height={15} />,
    icon: "mdi mdi-clipboard-list-outline",
  },
  {
    name: "appoinments",
    label: "Appoinments",
    icon: "fe-calendar",
  },
  fetchLocal.includes("super_admin") == true ? (
    {
      name: "myprofile",
      label: "My Profile",
      // icon: <img src="images/profile.png" alt="" height={15} />,
      icon: "fe-users",
    }
  ) : (
    <></>
  ),
  fetchLocal.includes("super_admin") == true ? (
    {
      name: "changelang",
      label: "Change Language",
      icon: "mdi mdi-clipboard-list-outline",
    }
  ) : (
    <></>
  ),
  {
    name: "logout",
    label: "Logout",
    // icon: <img src="images/logout" alt="" height={15} />,
    icon: "fe-log-out",
  },
];
