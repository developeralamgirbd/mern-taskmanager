import React, {useRef} from 'react';
import {getEmail, getOTP, setEmail, setOTP} from "../../helpers/sessionHelper";
import {errorToast, isEmpty, isPasswordSame} from "../../helpers/formHelper";
import {passwordCreateRequest} from "../../APIRequest/userApi";
import {useNavigate} from "react-router-dom";

const CratePassword = () => {
    let passwordRef, confirmPasswordRef = useRef();
    const navigate = useNavigate();

    const passwordCreate = ()=>{
        const email = getEmail();
        const password = passwordRef.value;
        const confirmPassword = confirmPasswordRef.value;
        if (isEmpty(password)){
            errorToast('Password is required')
        }else if(isEmpty(confirmPassword)){
            errorToast('Confirm Password is required')
        }
        else if (!isPasswordSame(password, confirmPassword)){
            errorToast('Password not match')
        }else {
            passwordCreateRequest(email, getOTP(), password).then(result => {
                if (result){
                    setOTP('');
                    setEmail('');
                    navigate('/login');
                }
            })
        }

    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SET NEW PASSWORD</h4>
                                <br/>
                                <label>Your email address</label>
                                <input readOnly={true} value={getEmail()}  placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <label>New Password</label>
                                <input placeholder="New Password" ref={(value)=>passwordRef = value} className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <label>Confirm Password</label>
                                <input placeholder="Confirm Password" ref={(value) => confirmPasswordRef = value} className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <button onClick={passwordCreate} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CratePassword;