import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Canceled = lazy(()=> import('../components/Canceled/Canceled'));

const CanceledPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <Canceled/>
        </Suspense>
    );
};

export default CanceledPage;