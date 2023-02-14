import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
const New = lazy(()=> import('../components/New/New'));

const NewPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <New/>
        </Suspense>
    );
};

export default NewPage;