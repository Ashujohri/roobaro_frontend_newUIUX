import axios from "axios";
import Swal from "sweetalert2";
var ServerURL = "http://localhost:9292";
// var ServerURL = "http://campusshala.com:9292";

const getDataAxios = async (Url) => {
  let Token = localStorage.getItem("token");
  try {
    var url = `${ServerURL}/${Url}`;
    var config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };

    var response = await axios.get(url, config);
    // console.log(response);
    var result = response.data;

    return result;
  } catch (error) {
    if (error.response.status === 401) {
      // alert("Session Expired");
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Session has Expired Please Login Again",
        showConfirmButton: false,
        timer: 30000,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("roleName");
      localStorage.removeItem("userData");
      setTimeout(() => window.location.replace("/AdminLogin"), 2000);
    } else {
      console.log(error);
    }
  }
};

// To Send Data In Node
const postDataAxios = async (Url, body) => {
  let Token = localStorage.getItem("token");
  try {
    var url = `${ServerURL}/${Url}`;
    var config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    const response = await axios.post(url, body, config);
    // console.log("response in post", response);
    var result = response.data;
    return result;
  } catch (error) {
    if (error.response.status === 401) {
      // alert("Session Expired");
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Session has Expired Please Login Again",
        showConfirmButton: false,
        timer: 30000,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("roleName");
      localStorage.removeItem("userData");
      setTimeout(() => window.location.replace("/AdminLogin"), 2000);
    } else {
      console.log(error);
    }
  }
};

const putDataAxios = async (Url, body) => {
  var Token = localStorage.getItem("token");
  try {
    var url = `${ServerURL}/${Url}`;
    const config = {
      headers: {
        "content-type": "application/json;charset=utf-8",
        Authorization: `Bearer ${Token}`,
      },
    };
    const response = await axios.put(url, body, config);
    var result = response.data;
    return result;
  } catch (error) {
    if (error.response.status === 401) {
      // alert("Session Expired");
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Session has Expired Please Login Again",
        showConfirmButton: false,
        timer: 30000,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("roleName");
      localStorage.removeItem("userData");
      setTimeout(() => window.location.replace("/AdminLogin"), 2000);
    } else {
      console.log(error);
    }
  }
};

const postDataAndImageAxios = async (Url, body) => {
  let Token = localStorage.getItem("token");
  try {
    var url = `${ServerURL}/${Url}`;
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${Token}`,
      },
    };

    var response = await axios.post(url, body, config);
    var result = response.data;
    return result;
  } catch (error) {
    if (error.response.status === 401) {
      // alert("Session Expired");
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Session has Expired Please Login Again",
        showConfirmButton: false,
        timer: 30000,
      });
      // localStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("roleName");
      localStorage.removeItem("userData");
      setTimeout(() => window.location.replace("/AdminLogin"), 2000);
    } else {
      console.log(error);
    }
  }
};

const putDataAndImageAxios = async (Url, body) => {
  var Token = localStorage.getItem("token");
  try {
    var url = `${ServerURL}/${Url}`;
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${Token}`,
      },
    };

    var response = await axios.put(url, body, config);
    var result = response.data;
    return result;
  } catch (error) {
    if (error.response.status === 401) {
      // alert("Session Expired");
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Session has Expired Please Login Again",
        showConfirmButton: false,
        timer: 30000,
      });
      // localStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("roleName");
      localStorage.removeItem("userData");
      setTimeout(() => window.location.replace("/AdminLogin"), 2000);
    } else {
      console.log(error);
    }
  }
};

const postDataAxiosWithoutToken = async (Url, body, config) => {
  try {
    var url = `${ServerURL}/${Url}`;
    config = { "content-type": "application/json;charset=utf-8" };
    const response = await axios.post(url, body, config);
    var result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export {
  ServerURL,
  getDataAxios,
  postDataAxios,
  putDataAxios,
  postDataAndImageAxios,
  postDataAxiosWithoutToken,
  putDataAndImageAxios,
};
