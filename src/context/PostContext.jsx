import React, { createContext, useContext } from 'react';
import { db } from '../config/firebase';
import { serverTimestamp, collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc, arrayUnion } from 'firebase/firestore';
import { useUser } from '../context/UserContext';

const PostContext = createContext();

export const usePost = () => {
    return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
    const { user } = useUser();
    const createPost = async (data) => {
        if (!user) {
            console.error("No user logged in. Post could not be created.");
            return;
        };
        try {
            const newPostRef = doc(collection(db, "posts"));
            await setDoc(newPostRef, {
                imageUrl: data.imageUrl || "",
                text: data.text || "",
                timestamp: serverTimestamp(),
                useruid: user.uid || "UNKNOWN",
                likes: [],
                comments: [],
            });
            console.log('Post created successfully');
            return newPostRef.id;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    };


    const getPost = async (postId) => {
        try {
            const postRef = doc(db, "posts", postId);
            const postDoc = await getDoc(postRef);
            if (postDoc.exists()) {
                return postDoc.data();
            } else {
                console.log('Post not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            return null;
        }
    };

    const getUserPosts = async (userId) => {
        try {
            const postsQuery = query(collection(db, "posts"), where("useruid", "==", userId));
            const querySnapshot = await getDocs(postsQuery);
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), postId: doc.id });
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
            const querySnapshot = await getDocs(collection(db, "posts"));
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), postId: doc.id });
            });
            return posts;
        } catch (error) {
            console.error('Error fetching all posts:', error);
            return [];
        }
    };

    const addComment = async (postId, commentData) => {
        try {
            const postRef = doc(db, "posts", postId);
            await updateDoc(postRef, {
                comments: arrayUnion(commentData),
            });
            console.log('Comment added successfully');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <PostContext.Provider
            value={{
                createPost,
                getPost,
                getUserPosts,
                getAllPosts,
                addComment
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
