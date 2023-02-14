import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Completed = lazy(()=> import('../components/Completed/Completed'));

const CompletedPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <Completed/>
        </Suspense>
    );
};

export default CompletedPage;