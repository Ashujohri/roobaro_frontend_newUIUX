import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./component/Dashboard/Dashboard";
import LoginWithEmail from "./component/Pages/LoginWithEmail/loginWithEmail";
import Reset from "./component/Pages/LoginWithEmail/ForgotPasswordEmail";
import MobileVerify from "./component/Pages/LoginWithMobile/MobileVerify";
import LoginWithMobile from "./component/Pages/LoginWithMobile/LoginWithMobile";
import UserView from "./component/Pages/User/UserView";
import User from "./component/Pages/User/User";
import AddUser from "./component/Pages/User/AddUser";
import Visit from "./component/Pages/Visitor/Visit";
import AddVisitor from "./component/Pages/Visitor/AddVisitor";
import VisitDetails from "./component/Pages/Visitor/VisitDetails";
import Minister from "./component/Pages/Minister/Minister";
import AddMinister from "./component/Pages/Minister/AddMinister";
import Profile from "./component/Pages/Profile";
import Languages from "./component/Pages/Localization/Languages";
import LabelTranslation from "./component/Pages/Localization/LabelTranslation";
import Label from "./component/Pages/Localization/Label";
import EditLabel from "./component/Pages/Localization/EditLabel";
import AddLabel from "./component/Pages/Localization/AddLabel";
import LanguageURL from "./component/Pages/Localization/LanguageURL";
import UserDashVisitor from "./component/Pages/UserDashboardVisitorPage/UserDashVisitor";

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
          <Route element={<AddUser />} path="/AddUser" />
          <Route element={<UserView />} path="/UserDetailView" />
          <Route element={<Minister />} path="/minister" />
          <Route element={<AddMinister />} path="/AddMinister" />
          <Route element={<Visit />} path="/visitors" />
          <Route element={<AddVisitor />} path="/AddVisitor" />
          <Route element={<VisitDetails />} path="/VisitorDetailView" />
          <Route element={<Profile />} path="/myprofile" />
          <Route element={<Languages />} path="/languages" />
          <Route element={<LabelTranslation />} path="/labelTranslation" />
          <Route element={<Label />} path="/AllLabels" />
          <Route element={<EditLabel />} path="/EditLabel" />
          <Route element={<AddLabel />} path="/AddLabel" />
          <Route element={<LanguageURL />} path="/getAllURLs" />
          <Route element={<UserDashVisitor />} path="/userDashVisitor" />
        </Routes>
      </Router>
    </>
  );
}
