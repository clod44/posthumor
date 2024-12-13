import * as Yup from 'yup';
import { serverTimestamp } from 'firebase/firestore';
//UID needs to be attached to data before usage

export const postSchema = Yup.object({
    text: Yup.string().default(""),
    imageUrl: Yup.string().required(),
    useruid: Yup.string().required(),
    timestamp: Yup.mixed().default(() => serverTimestamp()),
    likes: Yup.array().default([]),
    comments: Yup.array().default([]),
});

export const commentSchema = Yup.object().shape({
    useruid: Yup.string().required(),
    text: Yup.string().min(1, 'Comment text must not be empty').required(),
    timestamp: Yup.mixed().default(() => serverTimestamp()),
});