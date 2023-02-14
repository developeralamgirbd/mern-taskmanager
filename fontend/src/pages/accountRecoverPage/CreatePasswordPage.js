import React, {lazy, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";

const CratePassword = lazy(()=> import('../../components/accountRecover/CratePassword'));

const CreatePasswordPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <CratePassword/>
        </Suspense>
    );
};

export default CreatePasswordPage;