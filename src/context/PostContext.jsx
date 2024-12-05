import React, { createContext, useContext } from 'react';
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
                posts.push({ ...doc.data(), uid: doc.id });
            });
            return posts;
        } catch (error) {
            console.error('Error fetching all posts:', error);
            return [];
        }
    };

    const likePost = async (postuid) => {
        if (!user || !postuid) {
            console.error("No user logged in or postuid not provided.", user, postuid);
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
            console.log("postFound")

            if (likes.includes(user.uid)) {
                // User already liked the post, remove their like
                await updateDoc(postRef, {
                    likes: arrayRemove(user.uid),
                });
                return false;
            } else {
                // User has not liked the post, add their like
                await updateDoc(postRef, {
                    likes: arrayUnion(user.uid),
                });
                return true;
            }
        } catch (error) {
            console.error("Error updating likes:", error);
            return false;
        }
    };



    const addComment = async (postuid, commentText) => {
        if (!user || !postuid || !commentText) {
            console.error("No user logged in or postuid not provided or commentText is empty.");
            return false;
        }
        console.log("Adding comment...", postuid, commentText);
        try {
            const postRef = doc(db, "posts", postuid);
            const postSnap = await getDoc(postRef);
            if (!postSnap.exists()) {
                console.error('Post does not exist');
                return false;
            }

            const commentData = {
                useruid: user.uid,
                text: commentText,
                timestamp: Timestamp.now(),
            };

            console.log("Attempting to update Firestore document...");

            await updateDoc(postRef, {
                comments: arrayUnion(commentData),
            });

            console.log('Comment added successfully');
            return true;
        } catch (error) {
            console.error('Error adding comment:', error);
            return false;
        }
    };


    return (
        <PostContext.Provider
            value={{
                createPost,
                getPost,
                getUserPosts,
                getAllPosts,
                likePost,
                addComment,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
