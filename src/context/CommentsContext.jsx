import { createContext } from 'react';
import { db } from '../config/firebase';
import {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    Timestamp,
} from 'firebase/firestore';
import { useAuth, useToast } from "../hooks/useServices";
import { commentSchema } from '../utils/schemas';
import { validateData } from '../utils/validateData';

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
    const { authUser } = useAuth();
    const { toast } = useToast();

    const createComment = async (postuid, commentText) => {
        if (!authUser || !postuid || !commentText) {
            toast.error("Missing user, postuid, or commentText.");
            throw new Error("Missing user, postuid, or commentText.");
        }
        try {
            const postRef = doc(db, "posts", postuid);
            const postSnap = await getDoc(postRef);
            if (!postSnap.exists()) {
                throw new Error('Post does not exist');
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
            toast.success('Comment added successfully');
            return true;
        } catch (error) {
            toast.error('Error adding comment');
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
