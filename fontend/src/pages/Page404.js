import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
const NotFound = lazy(()=> import('../components/NotFound/NotFound'));

const Page404 = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <div className='container'>
                <div className='row justify-content-center align-items-center vh-100'>
                    <NotFound/>
                </div>
            </div>
        </Suspense>

    );
};

export default Page404;