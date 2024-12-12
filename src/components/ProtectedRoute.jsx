import { Spinner } from '@nextui-org/react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useServices';

const ProtectedRoute = ({ redirect = "/", redirectIfUserLoggedIn = false, element }) => {
    const { authUser, loading } = useAuth();

    if (loading) {
        return (
            <div className="fixed w-full h-screen z-[9999] bg-background/50 backdrop-blur-none flex items-center justify-center">
                <Spinner size="xl" color="default" />
            </div>
        );
    }
    if ((redirectIfUserLoggedIn && authUser) || (!redirectIfUserLoggedIn && !authUser)) {
        return <Navigate to={redirect} />;
    }
    return element;
};

export default ProtectedRoute;
