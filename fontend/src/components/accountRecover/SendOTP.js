import React, {useRef} from 'react';
import {emailVerifyRequest} from "../../APIRequest/userApi";
import {useNavigate} from "react-router-dom";

const SendOtp = () => {
        let emailRef = useRef();
        const navigate = useNavigate();

        const emailVerifyHandle = ()=>{
            const email = emailRef.value;
            emailVerifyRequest(email).then(result => {
                if (result){
                    navigate('/verify-otp');
                }
            })
        }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h4>EMAIL ADDRESS</h4>
                                <br/>
                                <label>Your email address</label>
                                <input ref={(input)=> emailRef = input } placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <button onClick={emailVerifyHandle} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SendOtp;