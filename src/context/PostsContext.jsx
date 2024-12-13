import { createContext } from 'react';
import { db } from '../config/firebase';
import {
    serverTimestamp,
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc,
    arrayUnion,
    orderBy,
    Timestamp,
} from 'firebase/firestore';
import { useAuth } from "../hooks/useServices";
import { postSchema } from '../utils/schemas';
import { validateData } from '../utils/validateData';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const { authUser } = useAuth();

    const createPost = async (data) => {
        if (!authUser) {
            console.error("No user logged in. Post could not be created.");
            return;
        }
        try {
            const validatedData = await validateData({ ...data, useruid: authUser.uid }, postSchema);
            const newPostRef = doc(collection(db, "posts"));
            await setDoc(newPostRef, validatedData);
            console.log('Post created successfully');
            return newPostRef.id; //uid
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    };

    const getPost = async (postuid) => {
        try {
            const postRef = doc(db, "posts", postuid);
            const postDoc = await getDoc(postRef);

            if (postDoc.exists()) {
                const validatedData = await validateData(postDoc.data(), postSchema);
                return { ...validatedData, uid: postDoc.id };
            } else {
                console.log('Post not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            return null;
        }
    };

    const getUserPosts = async (useruid) => {
        try {
            const postsQuery = query(collection(db, "posts"), where("useruid", "==", useruid));
            const querySnapshot = await getDocs(postsQuery);
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), postuid: doc.id });
            });
            return posts;
        } catch (error) {
            console.error('Error fetching user posts:', error);
            return [];
        }
    };

    const getAllPosts = async () => {
        console.log('Fetching all posts...');
        try {
            const postsQuery = query(
                collection(db, "posts"),
                orderBy("timestamp", "desc")
            );
            const querySnapshot = await getDocs(postsQuery);
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), postuid: doc.id });
            });
            return posts;
        } catch (error) {
            console.error('Error fetching all posts:', error);
            return [];
        }
    };

    const likePost = async (postuid) => {
        if (!authUser || !postuid) {
            console.error("No user logged in or postuid not provided.");
            return false;
        }
        try {
            const postRef = doc(db, "posts", postuid);
            const postSnapshot = await getDoc(postRef);
            if (!postSnapshot.exists()) {
                console.error("Post not found");
                return false;
            }
            const postData = postSnapshot.data();
            const likes = postData.likes || [];
            if (likes.includes(authUser.uid)) {
                await updateDoc(postRef, {
                    likes: arrayRemove(authUser.uid),
                });
                return false;
            } else {
                await updateDoc(postRef, {
                    likes: arrayUnion(authUser.uid),
                });
                return true;
            }
        } catch (error) {
            console.error("Error updating likes:", error);
            return false;
        }
    };

    return (
        <PostsContext.Provider
            value={{
                createPost,
                getPost,
                getUserPosts,
                getAllPosts,
                likePost,
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};