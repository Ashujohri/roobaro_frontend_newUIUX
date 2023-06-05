import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./component/Dashboard/Dashboard";
import LoginWithEmail from "./component/Pages/LoginWithEmail/loginWithEmail";
import Reset from "./component/Pages/LoginWithEmail/ForgotPasswordEmail";
import MobileVerify from "./component/Pages/LoginWithMobile/MobileVerify";
import LoginWithMobile from "./component/Pages/LoginWithMobile/LoginWithMobile";
// import DashboardUser from "./component/Dashboard/DashboardUser";
import UserView from "./component/Pages/User/UserView";
import ListItem from "./component/Dashboard/ListItem";
import User from "./component/Pages/User/User";
import AddUser from "./component/Pages/User/AddUser";
import Visit from "./component/Pages/Visitor/Visit";
import AddVisitor from "./component/Pages/Visitor/AddVisitor";
import VisitDetails from "./component/Pages/Visitor/VisitDetails";
import Minister from "./component/Pages/Minister/Minister";
import AddMinister from "./component/Pages/Minister/AddMinister";
import Profile from "./component/Pages/Profile";
import AppoinmentModel from "./component/Models/AppoinmentModel";
import MinisterDetails from "./component/Pages/Minister/MinisterDetails";
import Bread from "./component/Bread";
// import Dashboard360 from "./component/Dashboard/DashboardAdmin";


export default function AdminRouter(props) {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<LoginWithEmail />} path="/AdminLogin" />
          <Route element={<LoginWithEmail />} path="/" />
          <Route element={<LoginWithMobile />} path="/LoginWithMobile" />
          <Route element={<MobileVerify />} path="/MobileVerify" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Reset />} path="/ForgotPassword" />
          <Route element={<User />} path="/users" />
          <Route element={<AddUser />} path="/AddUser" breadcrumb='AddUser'/>
          <Route element={<UserView />} path="/UserDetailView" />
          <Route element={<Minister />} path="/minister" />
          <Route element={<AddMinister />} path="/AddMinister" />
          <Route element={<MinisterDetails />} path="/MinisterDetailView" />
          <Route element={<Visit />} path="/visitors" />
          <Route element={<AddVisitor />} path="/AddVisitor" />
          <Route element={<VisitDetails />} path="/VisitorDetailView" />
          <Route element={<Profile />} path="/myprofile" />
          <Route element={<AppoinmentModel />} path="/AppoinmentModel" />
          <Route element={<Bread/>} path="/Bread" />

          {/* <Route element={<DashboardUser />} path="/DashboardUser" /> */}
          {/* <Route element={<Dashboard360 />} path="/DashboardAdmin" /> */}
          {/* <Route element={<SentMail />} path="/SentMail" /> */}
        </Routes>
      </Router>
    </>
  );
}
