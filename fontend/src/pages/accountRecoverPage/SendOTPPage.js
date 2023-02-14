import React, {lazy, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const SendOtp = lazy(()=> import("../../components/accountRecover/SendOTP"))

const SendOtpPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <SendOtp/>
        </Suspense>
    );
};

export default SendOtpPage;