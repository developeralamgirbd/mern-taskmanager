import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Dashboard = lazy(()=> import('../components/Dashboard/Dashboard') )

const DashboardPage = () => {
    return (

        <Suspense fallback={<LazyLoader/>}>
            <Dashboard/>
        </Suspense>

    );
};

export default DashboardPage;