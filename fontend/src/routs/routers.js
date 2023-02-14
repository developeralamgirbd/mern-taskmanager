import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import CreatePage from "../pages/CreatePage";
import NewPage from "../pages/NewPage";
import ProgressPage from "../pages/ProgressPage";
import CompletedPage from "../pages/CompletedPage";
import CanceledPage from "../pages/CanceledPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Page404 from "../pages/Page404";
import MasterLayout from "../components/MasterLayout/MasterLayout";
import {getToken} from "../helpers/sessionHelper";
import SendOTPPage from "../pages/accountRecoverPage/SendOTPPage";
import VerifyOtpPage from "../pages/accountRecoverPage/VerifyOTPPage";
import CreatePasswordPage from "../pages/accountRecoverPage/CreatePasswordPage";

const Routers = () => {

    if (getToken()){
        return (
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={<MasterLayout/>}>
                            <Route  exact path='/' element={<DashboardPage/>}/>
                            <Route exact path='/create' element={<CreatePage/>}/>
                            <Route exact path='/all' element={<NewPage/>}/>
                            <Route exact path='/progress' element={<ProgressPage/>}/>
                            <Route exact path='/completed' element={<CompletedPage/>}/>
                            <Route exact path='/canceled' element={<CanceledPage/>}/>
                            <Route exact path='/profile' element={<ProfilePage/>}/>

                            <Route exact path='/login' element={<Navigate to='/' />} />
                            <Route exact path='/register' element={<Navigate to='/'/>} />
                            <Route exact path='/forgot-password' element={<Navigate to='/'/>} />

                            <Route exact path='/*' element={<Page404/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
        );
    }else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Navigate to='/login'/>} replace/>
                    <Route exact path='/login' element={<LoginPage/>}/>
                    <Route exact path='/register' element={<RegistrationPage/>}/>
                    <Route exact path='/forgot-password' element={<ForgotPasswordPage/>}/>
                    <Route exact path='/send-otp' element={<SendOTPPage/>}/>
                    <Route exact path='/verify-otp' element={<VerifyOtpPage/>} />
                    <Route exact path='/new-password' element={<CreatePasswordPage/>} />

                    <Route exact path='/*' element={<Page404/>}/>
                </Routes>
            </BrowserRouter>
        );
    }


};

export default Routers;