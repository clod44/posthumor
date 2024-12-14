import { createContext } from 'react';
import { db } from '../config/firebase';
import {
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
} from 'firebase/firestore';
import { useAuth, useToast } from "../hooks/useServices";
import { postSchema } from '../utils/schemas';
import { validateData } from '../utils/validateData';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const { authUser } = useAuth();
    const toast = useToast();

    const createPost = async (data) => {
        if (!authUser) {
            toast.error("No user logged in. Post could not be created.");
            throw new Error("No user logged in. Post could not be created.");
        }
        try {
            const validatedData = await validateData({ ...data, useruid: authUser.uid }, postSchema);
            const newPostRef = doc(collection(db, "posts"));
            await setDoc(newPostRef, validatedData);
            console.log('Post created successfully');
            toast.success("Post created successfully");
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
                toast.error('Post not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            toast.error('Error fetching post');
            return error;
        }
    };

    const getUserPosts = async (useruid) => {
        try {
            const postsQuery = query(collection(db, "posts"), where("useruid", "==", useruid));
            const querySnapshot = await getDocs(postsQuery);
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), uid: doc.id });
            });
            return posts;
        } catch (error) {
            console.error('Error fetching user posts:', error);
            toast.error('Error fetching user posts');
            throw error;
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
                posts.push({ ...doc.data(), uid: doc.id });
            });
            return posts;
        } catch (error) {
            console.error('Error fetching all posts:', error);
            toast.error('Error fetching public posts');
            throw error;
        }
    };

    const likePost = async (postuid) => {
        if (!authUser) {
            throw new Error("You need to be logged in to like a post.");
        }
        if (!postuid) {
            throw new Error("Missing postuid.");
        }
        try {
            const postRef = doc(db, "posts", postuid);
            const postSnapshot = await getDoc(postRef);
            if (!postSnapshot.exists()) {
                throw new Error("Post not found");
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
            throw error;
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
