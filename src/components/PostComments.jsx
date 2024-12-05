import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { FiSend } from "react-icons/fi";
import { usePost } from "../context/PostContext";
import { useState } from "react";
import PostComment from "./PostComment";


const PostComments = ({
    isOpen,
    onOpenChange,
    comments,
    postuid,
    ...props
}) => {

    const { addComment } = usePost();
    const [commentText, setCommentText] = useState('');
    const handleAddComment = async () => {
        if (commentText.trim() === '') return;
        const result = await addComment(postuid, commentText);
        console.log(result);
        setCommentText('');
    }
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="pb-16">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Comments</ModalHeader>
                            <ModalBody>

                                {comments.map((comment, index) => (
                                    <PostComment key={index} comment={comment} />
                                ))}
                            </ModalBody>
                            <ModalFooter>
                                <Input
                                    className="w-full"
                                    label="Add a comment"
                                    value={commentText}
                                    onValueChange={setCommentText}
                                    endContent={
                                        <Button
                                            onPress={handleAddComment}
                                            isIconOnly
                                        >
                                            <FiSend className="size-6" />
                                        </Button>
                                    }
                                />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );

};

export default PostComments;