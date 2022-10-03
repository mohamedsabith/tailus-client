import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import OtpVerify from "./components/otpVerification/OtpVerify";
import SigninForm from "./components/SigninForm/SigninForm";
import SignupForm from "./components/SignupForm/SignupForm";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import NotFound from "./components/NotFound/NotFound";
import Home from "./pages/Home";
import ProfilePage from "./pages/Profile";
import PrivateRoute from "./utils/PrivateRoute";
import UnAuthRoute from "./utils/UnAuthRoute";
const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>

           <Route element={<UnAuthRoute/>}>

            <Route path="/" element={<SigninForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/otpverify" element={<OtpVerify />} />
            <Route path="/forgotPassword" element={<ForgetPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />

           </Route>


          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </Router>
    </>
  );
};

export default App;
