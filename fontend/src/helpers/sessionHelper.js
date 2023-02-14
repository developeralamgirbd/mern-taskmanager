class SessionHelper {
    setToken = (token)=>{
        localStorage.setItem('token', token)
    }
    getToken = ()=>{
        return localStorage.getItem('token')
    }
    setUserDetails = (userInfo) => {
        localStorage.setItem('user', JSON.stringify(userInfo))
    }
    getUserDetails = () => {
        return JSON.parse(localStorage.getItem('user'));
    }

    removeSession = () => {
        localStorage.clear();
        window.location.href = '/login';
    }
    setEmail = (email) => {
        localStorage.setItem('email', email)
    }
    getEmail = () => {
        return localStorage.getItem('email');
    }
    setOTP = (otp) => {
        localStorage.setItem('otp', otp)
    }
    getOTP = ()=>{
        return localStorage.getItem('otp');
    }

}

export const {
    setToken,
    getToken,
    setUserDetails,
    getUserDetails,
    removeSession,
    setEmail,
    getEmail,
    setOTP,
    getOTP
} = new SessionHelper();