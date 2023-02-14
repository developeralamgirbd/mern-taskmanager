import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Profile = lazy(()=> import('../components/Profile/Profile'));

const ProfilePage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <Profile/>
        </Suspense>
    );
};

export default ProfilePage;


