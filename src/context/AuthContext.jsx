import { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInAnonymously } from 'firebase/auth';
import { Spinner } from '@nextui-org/react';
import { useToast } from '../hooks/useServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const toast = useToast();
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setAuthUser(currentUser ?? null);
            setLoading(false);
        });

        return unsubscribe;
    }, []);


    const anonymousLogin = async () => {
        setLoading(true);
        const toastId = toast("Creating account...", { autoClose: false, isLoading: true });
        let success = true;
        try {
            await signInAnonymously(auth);
            success = true;
        } catch (error) {
            console.error("Error during anonymous login:", error.message);
            success = false;
        } finally {
            toast.update(toastId, {
                render: success ? "Anonymous account created." : "Failed to create anonymous account.",
                isLoading: false,
                type: success ? "success" : "error",
                autoClose: 2000,
            });
            setLoading(false);
            return success;
        }
    };


    const googlePopupLogin = async () => {
        setLoading(true);
        const toastId = toast("Creating account...", { autoClose: false, isLoading: true });
        let success = true;
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            success = true;
        } catch (error) {
            console.error("Error during Google login:", error.message);
            success = false;
        } finally {
            toast.update(toastId, {
                render: success ? "Logged in with Google." : "Failed to login with Google.",
                isLoading: false,
                type: success ? "success" : "error",
                autoClose: 2000,
            })
            setLoading(false);
            return success;
        }
    };

    const logout = async () => {
        const toastId = toast("Logging out...", { autoClose: false, isLoading: true });
        const success = true;
        setLoading(true);
        try {
            await auth.signOut();
            success = true;
        } catch (error) {
            console.error("Error during logout:", error.message);
            success = false;
        } finally {
            toast.update(toastId, {
                render: success ? "Logged out." : "Failed to logout.",
                isLoading: false,
                type: success ? "success" : "error",
                autoClose: 2000,
            })
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
