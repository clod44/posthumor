import { Spinner } from '@nextui-org/react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ redirect = "/", redirectIfUserLoggedIn = false, element }) => {
    const { user, authLoading } = useUser();

    if (authLoading) {
        return (
            <div className="fixed w-full h-screen z-[9999] bg-background/50 backdrop-blur-none flex items-center justify-center">
                <Spinner size="xl" color="default" />
            </div>
        );
    }
    if ((redirectIfUserLoggedIn && user) || (!redirectIfUserLoggedIn && !user)) {
        return <Navigate to={redirect} />;
    }

    return element;
};

export default ProtectedRoute;
