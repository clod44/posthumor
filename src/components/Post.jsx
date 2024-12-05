import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import { IoMdMore } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { FaRegHeart, FaHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { usePost } from "../context/PostContext";
import { useEffect, useState, useMemo } from "react";
import { cld } from "../context/CloudinaryContext";
import PostImage from "./PostImage";
import PostComments from "./PostComments";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    const { user, getUserData } = useUser();
    const [userData, setUserData] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const { isOpen: isCommentsOpen, onOpen: onCommentsOpen, onOpenChange: onCommentsOpenChange } = useDisclosure();


    useEffect(() => {
        setIsLiked(post.likes.includes(user?.uid));
    }, [post?.likes, user?.uid]);


    const { likePost } = usePost();
    const handleLikePost = async () => {
        const currentLikedState = isLiked;
        setIsLiked(!currentLikedState); // optimistically update the UI
        console.log("isLiked prematurely changed to:", !currentLikedState);
        const newLikedState = await likePost(post.uid);
        if (newLikedState !== currentLikedState) {
            setIsLiked(newLikedState); // confirm with server response if needed
        }
        console.log("isLiked data confirmed:", newLikedState);
    };


    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData(post.useruid);
            setUserData(userData);
        };
        fetchUserData();
    }, [post.useruid]);



    // post.imageUrl is the public ID
    //fallback id is image not found image id
    const cloudinaryImage = useMemo(() => cld.image(post?.imageUrl ?? "fallback_image_id"), [post?.imageUrl]);

    return (
        <>
            <PostComments
                isOpen={isCommentsOpen}
                onOpenChange={onCommentsOpenChange}
                postuid={post.uid}
                comments={post.comments}
            />

            <div className="overflow-hidden max-w-[400px] mx-auto w-full">
                <div className="flex items-center gap-2 p-2">
                    <Avatar size="sm" src={userData?.profilePictureUrl} />
                    <p className="flex-grow font-bold text-small">{userData?.displayName}</p>
                    <Button isIconOnly size="sm" className="p-2" variant="light">
                        <IoMdMore className="w-full h-full" />
                    </Button>
                </div>

                <div className="w-full h-full overflow-hidden">
                    <PostImage cloudinaryImage={cloudinaryImage} />
                </div>
                <div className="px-2 py-1">
                    <div className="flex justify-between items-center">
                        <Button
                            size="sm"
                            className="p-2 px-0"
                            variant="light"
                            color={isLiked ? "danger" : "default"}
                            startContent={
                                isLiked ?
                                    <FaHeart className="w-auto h-full aspect-square" />
                                    :
                                    <FaRegHeart className="w-auto h-full aspect-square" />
                            }
                            onClick={handleLikePost}
                        >
                            {post?.likes.length || ""}
                        </Button>
                        <Button
                            size="sm"
                            className="p-2 px-0"
                            variant="light"
                            startContent={<FaRegComment className="w-auto h-full aspect-square" />}
                            onClick={onCommentsOpen}
                        >
                            {post?.comments?.length || ""}
                        </Button>

                        <Button
                            isIconOnly
                            size="sm"
                            className="p-2 px-0"
                            variant="light"
                            startContent={<FiSend className="w-auto h-full aspect-square" />}
                        />

                        <div className="flex-grow" />

                        <Button
                            isIconOnly
                            size="sm"
                            className="p-2"
                            variant="light"
                            startContent={<FaRegBookmark className="w-auto h-full aspect-square" />}
                        />
                    </div>

                    <div className="p-2">
                        <p className="text-small">
                            <Link
                                to={`/profile/${userData?.username}`}
                            >
                                <span className="font-bold me-2">{userData?.username}</span>
                            </Link>
                            {post?.text}
                        </p>
                        <p className="text-tiny text-foreground-300 py-2">
                            {post?.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleString() : ""}
                        </p>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Post;
