import cogoToast from "cogo-toast";

class FormHelper{
    emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    mobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

    isEmpty = (value)=>{
        return value.length === 0;
    }

    isEmail = (email)=> {
        return !this.emailRegx.test(email)
    }

    isMobile = (mobile)=> {
        return !this.mobileRegx.test(mobile)
    }

    isPasswordSame = (password, confirmPassword) => {
        return password === confirmPassword;
    }

    errorToast = (msg)=> {
        cogoToast.error(msg, {position: "bottom-center"});
    }
    successToast = (msg)=> {
        cogoToast.success(msg, {position: "bottom-center"});
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
}

export const {isEmpty, isEmail, isMobile, isPasswordSame, errorToast, successToast, getBase64 } = new FormHelper();