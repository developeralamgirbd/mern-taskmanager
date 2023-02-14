import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
const ForgotPassword = lazy(()=> import('../components/ForgotPassword/ForgotPassword'));

const ForgotPasswordPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <ForgotPassword/>
        </Suspense>
    );
};

export default ForgotPasswordPage;