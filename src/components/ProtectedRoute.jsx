// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ redirect = "/", redirectIfUserLoggedIn = false, element }) => {
    const { user, authLoading } = useUser();

    if (authLoading) {
        return (
            <div className='fixed top-0 left-0 w-full h-screen z-[999]'>
                loading
            </div>
        );
    }
    if ((redirectIfUserLoggedIn && user) || (!redirectIfUserLoggedIn && !user)) {
        return <Navigate to={redirect} />;
    }

    return element;
};

export default ProtectedRoute;
