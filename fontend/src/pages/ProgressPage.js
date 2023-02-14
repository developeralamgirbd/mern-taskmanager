import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Progress = lazy(()=> import('../components/Progress/Progress'));

const ProgressPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <Progress/>
        </Suspense>
    );
};

export default ProgressPage;