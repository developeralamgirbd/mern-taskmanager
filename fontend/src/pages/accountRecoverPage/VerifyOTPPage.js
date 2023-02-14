import React, {lazy, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const VerifyOTP = lazy(()=> import('../../components/accountRecover/VerifyOTP'));

const VerifyOtpPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <VerifyOTP/>
        </Suspense>
    );
};

export default VerifyOtpPage;