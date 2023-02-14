import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Create = lazy(()=> import('../components/Create/Create'));

const CreatePage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <Create/>
        </Suspense>
    );
};

export default CreatePage;