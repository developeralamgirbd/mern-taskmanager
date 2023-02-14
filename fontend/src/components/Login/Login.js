import React, {useRef} from 'react';
import {errorToast, isEmail, isEmpty} from "../../helpers/formHelper";
import {Link} from "react-router-dom";
import {loginRequest} from "../../APIRequest/userApi";

const Login = () => {

    let emailRef, passwordRef = useRef();

    const onSubmitHandle = (event)=>{
        event.preventDefault();

        const email = emailRef.value;
        const password = passwordRef.value.trim();
        if (isEmail(email)){
            errorToast('Please provide a valid email address')
        }else if (isEmpty(password)){
            errorToast('Password is required')
        }else {
            loginRequest(email, password).then(result => {
                if (result){
                    window.location.href = '/'
                }
            });
        }
    }

    return (
        <div className="container">
            <div className="row  justify-content-center">
                <div className="col-md-10 col-lg-10 center-screen">
                    <div className="card animated fadeIn w-100 p-3">
                        <div className="card-body">
                            <h4>Login Up</h4>
                            <hr/>
                            <form onSubmit={onSubmitHandle}>
                                <div className="form-group mt-4">
                                    <label htmlFor='email' className='form-label'>Email Address</label>
                                    <input type="email" ref={(input)=>emailRef=input} id='email'  placeholder="User Email" className="form-control animated fadeInUp"/>
                                </div>

                                <div className="form-group mt-4">
                                    <label htmlFor='password' className='form-label'>Password</label>
                                    <input ref={(input)=>passwordRef=input} id='password' placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                </div>
                                <button type='submit' className='btn btn-primary mt-4'>Login</button>
                            </form>
                            <div className="float-end mt-3">
                                <span>
                                    <Link className="text-center ms-3 h6 animated fadeInUp" to="/register">Sign Up </Link>
                                    <span className="ms-1">|</span>
                                    <Link className="text-center ms-3 h6 animated fadeInUp" to="/send-otp">Forget Password</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;