import { useState } from "react";
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { FiSend } from "react-icons/fi";
import { useComments, useAuth } from "../hooks/useServices";
import { validateData } from "../utils/validateData";
import { commentSchema } from "../utils/schemas";
import PostComment from "./PostComment";
import { Timestamp } from "firebase/firestore";


const PostComments = ({
    isOpen,
    onOpenChange,
    comments,
    setComments,
    postuid,
    ...props
}) => {
    const { authUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const { createComment } = useComments();
    const [commentText, setCommentText] = useState('');
    const handleCreateComment = async () => {
        if (commentText.trim().length === 0 || !postuid) return;
        setLoading(true);
        let success = true;
        try {
            await createComment(postuid, commentText);
        } catch (error) {
            success = false;
            console.error('Error adding comment:', error);
        } finally {
            if (success) {
                const newComment = { useruid: authUser.uid, text: commentText, timestamp: Timestamp.now() };
                try {
                    const validatedComment = await validateData(newComment, commentSchema);
                    setComments((prevComments) => [...prevComments, validatedComment]);
                    setCommentText('');
                } catch (error) {
                    console.error('Error adding comment:', error);
                }
            }
            setLoading(false);
        }
    }
    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                className="h-full"
            >
                <ModalContent className="mb-16">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Comments</ModalHeader>
                            <ModalBody
                                className="px-4"
                            >
                                {comments.map((comment, index) => (
                                    <PostComment key={index} comment={comment} />
                                ))}
                                <p className="text-center text-foreground-400">
                                    No more comments.
                                </p>
                            </ModalBody>
                            <ModalFooter
                                className="p-4"
                            >
                                <Textarea
                                    className="w-full"
                                    label="Add a comment"
                                    variant="bordered"
                                    minRows={1}
                                    value={commentText}
                                    onValueChange={setCommentText}
                                    isReadOnly={loading}
                                />
                                <Button
                                    onPress={handleCreateComment}
                                    className="h-full"
                                    isIconOnly
                                    isLoading={loading}
                                >
                                    {loading ? "" : <FiSend className="size-6" />}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default PostComments;