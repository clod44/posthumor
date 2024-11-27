// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Box, Center, Loader } from '@mantine/core';

const ProtectedRoute = ({ redirect = "/", redirectIfUserLoggedIn = false, element }) => {
    const { user, authLoading } = useUser();

    if (authLoading) {
        return (
            <Center>
                <Box>
                    <Loader />
                </Box>
            </Center>
        );
    }
    if ((redirectIfUserLoggedIn && user) || (!redirectIfUserLoggedIn && !user)) {
        return <Navigate to={redirect} />;
    }

    return element;
};

export default ProtectedRoute;
