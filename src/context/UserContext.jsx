import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { runTransaction, doc, getDoc, query, where, collection, limit } from "firebase/firestore";
import { useAuth } from "../hooks/useServices";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuth();

    useEffect(() => {
        if (authUser) {
            ensureUserProfileExists(authUser.uid);
            refreshUserProfile();
        }
    }, [authUser]);

    const refreshUserProfile = async () => {
        if (!authUser) {
            console.log("No user logged in. userData could not be refreshed.");
            return;
        };
        const data = await fetchUserProfile({ uid: authUser.uid });
        setUserProfile(data);
        console.log(data)
    };

    const fetchUserProfile = async ({ uid, username }) => {
        if (!uid && !username) {
            throw new Error('Either uuid or username must be provided');
        }
        let userQuery;
        if (uid) {
            userQuery = doc(db, 'users', uid);
        } else if (username) {
            userQuery = query(
                collection(db, 'users'),
                where('username', '==', username),
                limit(1)
            );
        }
        try {
            const snapshot = await getDoc(userQuery);
            if (!snapshot.exists()) {
                throw new Error("User not found >" + (uid ?? username) + "<");
            }
            return snapshot.data();
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    };

    const ensureUserProfileExists = async (useruid) => {
        console.log("Initializing user data for user UID:", useruid);
        const userRef = doc(db, "users", useruid);
        try {
            await runTransaction(db, async (transaction) => {
                const userDoc = await transaction.get(userRef);

                if (!userDoc.exists()) {
                    const newUserData = {
                        bio: "",
                        displayName: "User",
                        profilePicture: "",
                        totalFollowers: 0,
                        totalFollowing: 0,
                        totalPosts: 0,
                        username: useruid.slice(0, 6),
                    };
                    transaction.set(userRef, newUserData);
                }
            });
        } catch (error) {
            console.error("Error initializing user data:", error);
        }
    };

    const updateUserProfile = async (data) => {
        throw new Error('Not implemented');
    };

    return (
        <UserContext.Provider
            value={{
                userProfile,
                loading,
                fetchUserProfile,
                refreshUserProfile,
                updateUserProfile,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
