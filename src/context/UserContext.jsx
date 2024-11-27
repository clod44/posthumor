import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

import { Box, LoadingOverlay } from '@mantine/core';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const registerWithEmail = async (email, password) => {
        setLoading(true);
        let success = true;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error during registration:", error.message);
            success = false;
        } finally {
            setLoading(false);
            return success;
        }
    };

    const loginWithEmail = async (email, password) => {
        setLoading(true);
        let success = true;
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error during login:", error.message);
            success = false;
        } finally {
            setLoading(false);
            return success;
        }
    };

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
        <UserContext.Provider
            value={{
                user,
                loading,
                authLoading,
                registerWithEmail,
                loginWithEmail,
                anonymousLogin,
                googlePopupLogin,
                logout
            }}
        >
            <Box pos="relative">
                <LoadingOverlay
                    visible={authLoading}
                    zIndex={1000}
                    overlayProps={{ blur: 2 }}
                    loaderProps={{ size: "xl", type: "dots" }}
                />
                {children}
            </Box>
        </UserContext.Provider>
    );
};
