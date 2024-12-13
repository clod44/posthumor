import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { runTransaction, doc, getDoc, getDocs, query, where, collection, limit } from "firebase/firestore";
import { useAuth, useToast } from "../hooks/useServices";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { authUser, loading: authUserLoading } = useAuth();
    const toast = useToast();

    useEffect(() => {
        const loadProfile = async () => {
            if (authUser && !authUserLoading) {
                setLoading(true);
                try {
                    await ensureUserProfileExists(authUser.uid);
                    await refreshUserProfile();
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setUserProfile(null);
                setLoading(false);
            }
        };
        loadProfile();
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
            throw new Error('Either uid or username must be provided');
        }

        try {
            if (uid) {
                const userDoc = await getDoc(doc(db, 'users', uid));
                if (!userDoc.exists()) {
                    throw new Error(`User not found with uid: ${uid}`);
                }
                return userDoc.data();
            } else if (username) {
                const userQuery = query(
                    collection(db, 'users'),
                    where('username', '==', username),
                    limit(1)
                );
                const querySnapshot = await getDocs(userQuery);
                if (querySnapshot.empty) {
                    throw new Error(`User not found with username: ${username}`);
                }
                return querySnapshot.docs[0].data();
            }
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
