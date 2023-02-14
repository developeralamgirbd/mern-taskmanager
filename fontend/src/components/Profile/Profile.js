import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {errorToast, getBase64, isEmail, isEmpty, isMobile, isPasswordSame} from "../../helpers/formHelper";
import {useNavigate} from "react-router-dom";
import {getProfile, profileUpdateRequest, registerRequest} from "../../APIRequest/userApi";

const Profile = () => {
    let emailRef,firstNameRef,lastNameRef,mobileRef,passwordRef,userImgRef,userImgView=useRef();

    useEffect(()=>{
        getProfile()
    },[])


    const ProfileData = useSelector((state) => state.profile.value);
    let navigate = useNavigate();


    const PreviewImage = () => {
        let ImgFile = userImgRef.files[0];
        getBase64(ImgFile).then((base64Img)=>{
            userImgView.src = base64Img;
        })
    }

    const UpdateMyProfile = () => {
        let email = emailRef.value;
        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let password = passwordRef.value;
        let photo = userImgView.src

        if (isEmpty(firstName)){
            errorToast('First Name is required')
        }else if (isEmpty(lastName)){
            errorToast('Last Name is required')
        }else if (isEmail(email)){
            errorToast('Please provide a valid email address')
        }else if (isMobile(mobile)){
            errorToast('Please provide a valid mobile number')
        }else if (isEmpty(password)){
            errorToast('Password is required')
        }else if (isEmpty(password)){
            errorToast('Password is required')
        }else {

           profileUpdateRequest(email, firstName, lastName, mobile, password, photo).then(result => {
               if (result){
                   navigate('/')
               }
           })
        }
    }


    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input)=>userImgView = input} className="icon-nav-img-lg" src={ProfileData['photo']} alt=""/>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Profile Picture</label>
                                        <input onChange={PreviewImage}  ref={(input)=>userImgRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="file"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Email Address</label>
                                        <input key={Date.now()} defaultValue={ProfileData['email']}  readOnly={true}  ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>First Name</label>
                                        <input  key={Date.now()} defaultValue={ProfileData['firstName']} ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Last Name</label>
                                        <input key={Date.now()} defaultValue={ProfileData['lastName']}  ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Mobile</label>
                                        <input key={Date.now()} defaultValue={ProfileData['mobile']} ref={(input)=>mobileRef=input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Password</label>
                                        <input key={Date.now()} defaultValue={ProfileData['password']}  ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={UpdateMyProfile}  className="btn w-100 float-end btn-primary animated fadeInUp">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;