import * as Yup from 'yup';
import { serverTimestamp } from 'firebase/firestore';

//UID needs to be attached to data before usage

export const postSchema = Yup.object({
    text: Yup.string().default(""),
    imageUrl: Yup.string().required().url(),
    useruid: Yup.string().required(),
    timestamp: Yup.mixed().test('is-timestamp', 'Timestamp must be a Firestore server timestamp', value => {
        return value === null || (value && value.constructor.name === 'Timestamp');
    }).default(() => serverTimestamp()),
    likes: Yup.array().default([]),
    comments: Yup.array().default([]),
});

export const commentSchema = Yup.object().shape({
    useruid: Yup.string().required(),
    text: Yup.string().min(1, 'Comment text must not be empty').required(),
    timestamp: Yup.mixed().test('is-timestamp', 'Timestamp must be a Firestore server timestamp', value => {
        return value === null || (value && value.constructor.name === 'Timestamp');
    }).default(() => serverTimestamp()),
});