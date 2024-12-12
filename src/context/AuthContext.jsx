import { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInAnonymously } from 'firebase/auth';
import { Spinner } from '@nextui-org/react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setAuthUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const anonymousLogin = async () => {
        setLoading(true);
        let success = true;
        try {
            await signInAnonymously(auth);
        } catch (error) {
            console.error("Error during anonymous login:", error.message);
            success = false;
        } finally {
            setLoading(false);
            return success;
        }
    };

    const googlePopupLogin = async () => {
        setLoading(true);
        let success = true;
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error during Google login:", error.message);
            success = false;
        } finally {
            setLoading(false);
            return success;
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error during logout:", error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <AuthContext.Provider
            value={{
                authUser,
                loading,
                anonymousLogin,
                googlePopupLogin,
                logout
            }}
        >
            {loading &&
                <div className="fixed w-full h-screen z-[99999] bg-background/50 backdrop-blur-none flex items-center justify-center">
                    <Spinner size="xl" color="default" />
                </div>
            }
            {children}
        </AuthContext.Provider>
    );
};
