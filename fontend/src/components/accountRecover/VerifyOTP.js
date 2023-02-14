import React, {useState} from 'react';
import ReactCodeInput from "react-code-input";
import {errorToast} from "../../helpers/formHelper";
import {otpVerifyRequest} from "../../APIRequest/userApi";
import {useNavigate} from "react-router-dom";

const VerifyOtp = () => {

    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const defaultInputStyle = {
        fontFamily: "monospace",
        MozAppearance: "textfield",
        margin: "4px",
        paddingLeft: "8px",
        width: "45px",
        borderRadius: '3px',
        height: "45px",
        fontSize: "32px",
        border: '1px solid lightskyblue',
        boxSizing: "border-box",
        color: "black",
        backgroundColor: "white",
        borderColor: "lightgrey"
    }

    const verifyOTP = ()=>{
        if (otp.length !== 6){
            errorToast('OTP input 6 digit code')
        }else {
            otpVerifyRequest(otp).then(result => {
              if (result){
                  navigate('/new-password')
              }
            })
        }
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h4>OTP VERIFICATION </h4>
                                <p>A 6 Digit verification code has been sent to your email address. </p>
                                <ReactCodeInput type='number' onChange={(value)=>setOtp(value)} inputStyle={defaultInputStyle}  fields={6}/>
                                <br/>  <br/>
                                <button onClick={verifyOTP} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyOtp;