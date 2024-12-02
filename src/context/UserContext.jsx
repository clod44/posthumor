import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { runTransaction, doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { Spinner } from "@nextui-org/react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            refreshUserData();
        }
    }, [user]);

    /**
     * fetch updated userData of logged-in user.
     * updates the userData state.
     */
    const refreshUserData = async () => {
        if (!user) {
            console.log("No user logged in. userData could not be refreshed.");
            return;
        };
        const data = await getUserData(user.uid);
        setUserData(data);
        console.log(data)
    };

    /**
     * @param {string} userId - The unique identifier of the user.
     * @returns {Promise<object|null>} - The user data object with all properties or null if user is not found.
     */
    const getUserData = async (userId) => {
        if (!userId) {
            console.error("User ID is undefined or null");
            return null;
        }
        setLoading(true);
        const userRef = doc(db, "users", userId);
        try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const uid = userDoc.id;
                return { ...userData, uid };
            } else {
                console.log("User not found.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getUserDataWithUsername = async (username) => {
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                const uid = userDoc.id;
                return { ...userData, uid };
            } else {
                console.log("User not found.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching user data by username:", error);
            return null;
        }
    };


    /**
     * if needed, creates initial userData in the database
     * @param {string} userId
     */
    const ensureUserDataInitialized = async (userId) => {
        console.log("Initializing user data..." + userId);
        const userRef = doc(db, "users", userId);
        try {
            await runTransaction(db, async (transaction) => {
                const userDoc = await transaction.get(userRef);

                if (userDoc.exists()) {
                    return;
                }

                const newUserData = {
                    bio: "",
                    displayName: "User",
                    profilePicture: "",
                    totalFollowers: 0,
                    totalFollowing: 0,
                    totalPosts: 0,
                    username: userId,
                };
                transaction.set(userRef, newUserData);
            });
        } catch (error) {
            console.error("Error initializing user data:", error);
            alert("Error initializing user data: " + error.message);
        }
    };


    const registerWithEmail = async (email, password) => {
        setLoading(true);
        let success = true;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await ensureUserDataInitialized(auth.currentUser?.uid);
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
            await ensureUserDataInitialized(auth.currentUser?.uid);
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
            await ensureUserDataInitialized(auth.currentUser?.uid);
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
                userData,
                loading,
                refreshUserData,
                getUserData,
                getUserDataWithUsername,
                authLoading,
                registerWithEmail,
                loginWithEmail,
                anonymousLogin,
                googlePopupLogin,
                logout
            }}
        >
            {authLoading &&
                <div className="fixed w-full h-screen z-[99999] bg-background/50 backdrop-blur-none flex items-center justify-center">
                    <Spinner size="xl" color="default" />
                </div>
            }
            {children}
        </UserContext.Provider>
    );
};
