import { useState } from "react";
import { Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { FiSend } from "react-icons/fi";
import { useComments } from "../hooks/useServices";
import PostComment from "./PostComment";


const PostComments = ({
    isOpen,
    onOpenChange,
    comments,
    postuid,
    ...props
}) => {
    const { createComment } = useComments();
    const [commentText, setCommentText] = useState('');
    const handleCreateComment = async () => {
        if (commentText.trim().length === 0 || !postuid) return;
        const result = await createComment(postuid, commentText);
        setCommentText('');
    }
    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                className="h-full"
            >
                <ModalContent className="pb-16">
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
                                />

                                <Button
                                    onPress={handleCreateComment}
                                    className="h-full"
                                    isIconOnly
                                >
                                    <FiSend className="size-6" />
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