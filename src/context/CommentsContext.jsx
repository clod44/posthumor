import { createContext } from 'react';
import { db } from '../config/firebase';
import {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    Timestamp,
} from 'firebase/firestore';
import { useAuth } from "../hooks/useServices";
import { commentSchema } from '../utils/schemas';
import { validateData } from '../utils/validateData';

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
    const { authUser } = useAuth();

    const createComment = async (postuid, commentText) => {
        if (!authUser || !postuid || !commentText) {
            console.error("Missing user, postuid, or commentText.");
            return false;
        }
        try {
            const postRef = doc(db, "posts", postuid);
            const postSnap = await getDoc(postRef);
            if (!postSnap.exists()) {
                console.error('Post does not exist');
                return false;
            }
            const commentData = {
                useruid: authUser.uid,
                text: commentText,
                timestamp: Timestamp.now(),
            };
            const validatedComment = await validateData(commentData, commentSchema);
            await updateDoc(postRef, {
                comments: arrayUnion(validatedComment),
            });
            console.log('Comment added successfully');
            return true;
        } catch (error) {
            console.error('Error adding comment:', error);
            return false;
        }
    };
    return (
        <CommentsContext.Provider
            value={{
                createComment,
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
};
