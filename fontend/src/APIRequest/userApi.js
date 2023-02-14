import axios from "axios";
import {errorToast, successToast} from "../helpers/formHelper";
import store from '../redux/store/store';
import {hideLoader, showLoader} from "../redux/state-slice/settings-slice";
import {getEmail, getToken, removeSession, setEmail, setOTP, setToken, setUserDetails} from "../helpers/sessionHelper";
import {setProfile} from "../redux/state-slice/profile-slice";


const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const AxiosHeaders = {headers: {'authorization': getToken()}};

export const registerRequest = (firstName, lastName, email, mobile, password, confirmPassword, photo)=>{
        store.dispatch(showLoader());
       const postBody = { email, firstName, lastName, mobile, password, confirmPassword, photo };
       return axios.post(`${apiBaseUrl}/register`, postBody).then(res => {
           store.dispatch(hideLoader())
            if (res.status === 200){
                successToast('Registration Success');
                return true
            }
        }).catch(error => {
            store.dispatch(hideLoader());
            errorToast(error.response.data.error);
            return false;
        })
}
export const loginRequest = (email, password)=>{
        // show full screen loader
        store.dispatch(showLoader());
       const postBody = { email, password};
       return axios.post(`${apiBaseUrl}/login`, postBody).then(res => {
           // hide full screen loader
           store.dispatch(hideLoader());
            if (res.status === 200){
                setToken(res.data?.token);
                setUserDetails(res.data?.user);
                successToast('Login Success');
                return true
            }
        }).catch(error => {
            store.dispatch(hideLoader());
            errorToast(error.response.data.error);
            return false;
        })
}

export const getProfile = () => {
    store.dispatch(showLoader);
    const url = `${apiBaseUrl}/profileDetails`;

    axios.get(url, AxiosHeaders).then(res => {
        store.dispatch(hideLoader);
        if (res.status === 200){
            store.dispatch(setProfile(res.data['data'][0]))
        }else {
            errorToast('Server Error Occurred')
        }
    }).catch(error => {
        store.dispatch(hideLoader);
        if (error.response.status === 401){
            removeSession();
        }else {
            errorToast('Server Error Occurred')
        }
    })
}

export const profileUpdateRequest = (email,firstName,lastName,mobile,password,photo)=>{
    store.dispatch(showLoader);
    const url = `${apiBaseUrl}/profileUpdate`;
    const postData ={ email: email, firstName: firstName, lastName: lastName, password: password, mobile: mobile,  photo: photo };
    const userInfo = { email: email, firstName: firstName, lastName: lastName, mobile: mobile,  photo: photo }

   return axios.post(url, postData, AxiosHeaders).then(res => {
        store.dispatch(hideLoader);
        if (res.status === 200){
            successToast('Profile update successfully');
            setUserDetails(userInfo);
            return true;
        }else {
            errorToast('Server error occurred')
        }
    }).catch(error => {
        store.dispatch(hideLoader);
        if (error.response.status === 401){
            errorToast('Unauthorized')
        }else {
            errorToast('Server error occurred')
        }
    })
}

export const emailVerifyRequest = (email)=>{
    store.dispatch(showLoader);
    const url = `${apiBaseUrl}/RecoverVerifyEmail/${email}`;
   return axios.get(url).then(res => {
        store.dispatch(hideLoader);
        if (res.status === 200){
            setEmail(email);
            successToast('A 6 Digit verification code has been sent to your email address.')
            return true
        }
    }).catch(error => {
        store.dispatch(hideLoader);
        if (error.response.status === 400){
            errorToast(error.response.data.error)
            return false
        }else {
            errorToast('Server error occurred');
            return false
        }

    })
}

export const otpVerifyRequest = (otp)=>{
    store.dispatch(showLoader);
    const email = getEmail();
    const url = `${apiBaseUrl}/RecoverVerifyOTP/${email}/${otp}`;

    return axios.get(url).then(res => {
        store.dispatch(hideLoader);
        if (res.status === 200){
            setOTP(otp);
            successToast('Code verification successfully');
            return true
        }
    }).catch(error => {
        store.dispatch(hideLoader);
        if (error.response.status === 400){
            errorToast(error.response.data.error)
            return false
        }else {
            errorToast('Server error occurred');
            return false
        }
    })
}

export const passwordCreateRequest = (email, otp, password)=>{
    store.dispatch(showLoader);
    const url = `${apiBaseUrl}/RecoverResetPass`;
    const postBody = {email, otp, password};

    return axios.post(url, postBody).then(res => {
        store.dispatch(hideLoader);

        if (res.status === 200){
            successToast('Password reset successfully');
            return true;
        }

    }).catch(error => {
        store.dispatch(hideLoader);
        if (error.response.status === 400){
            errorToast(error.response.data.error)
            return false
        }else {
            errorToast('Server error occurred');
            return false
        }
    })
}