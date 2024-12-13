import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import { IoMdMore } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { FaRegHeart, FaHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { useAuth, useUser, usePosts } from "../hooks/useServices"
import { useEffect, useState, useMemo } from "react";
import { cld } from "../context/CloudinaryContext";
import PostImage from "./PostImage";
import PostComments from "./PostComments";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    const { authUser } = useAuth();
    const { fetchUserProfile } = useUser();
    const [userProfile, setUserProfile] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const { isOpen: isCommentsOpen, onOpen: onCommentsOpen, onOpenChange: onCommentsOpenChange } = useDisclosure();

    useEffect(() => {
        if (!post || !authUser) return;
        setIsLiked(post.likes.includes(authUser.uid));
    }, [post?.likes, authUser?.uid]);

    const { likePost } = usePosts();
    const handleLikePost = async () => {
        const currentLikedState = isLiked;
        let newLikedState = currentLikedState;
        setIsLiked(!currentLikedState); //optimistically update the ui
        console.log("client new:", isLiked);
        try {
            newLikedState = await likePost(post.uid);
            console.log("server response:", isLiked);
        } catch (error) {
            newLikedState = currentLikedState;
            console.error("Failed to like post:", error);
        } finally {
            setIsLiked(newLikedState);
            console.log("isLiked", isLiked);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const userProfile = await fetchUserProfile({ uid: post.useruid });
            setUserProfile(userProfile);
        };
        fetchUserData();
    }, [post.useruid]);

    // post.imageUrl is the public ID
    //fallback id is image not found image id
    const cloudinaryImage = useMemo(() => cld.image(post?.imageUrl ?? "notfound"), [post?.imageUrl]);
    return (
        <>
            <PostComments
                isOpen={isCommentsOpen}
                onOpenChange={onCommentsOpenChange}
                postuid={post.uid}
                comments={post.comments}
            />
            <div className="overflow-hidden max-w-[400px] mx-auto w-full">
                {/*TOP BAR*/}
                <div className="flex items-center gap-2 p-2 pe-0">
                    <Avatar size="sm" src={userProfile?.profilePictureUrl} />
                    <p className="flex-grow font-bold text-small">{userProfile?.displayName}</p>
                    <Button isIconOnly size="sm" className="p-2" variant="light">
                        <IoMdMore className="w-full h-full" />
                    </Button>
                </div>
                {/*POST IMAGE*/}
                <div className="w-full h-full overflow-hidden">
                    <PostImage cloudinaryImage={cloudinaryImage} />
                </div>
                {/*ACTION BAR*/}
                <div className="px-2 py-1">
                    <div className="grid grid-cols-7 grid-rows-1 grid-flow-col place-items-center">
                        <Button
                            size="sm"
                            className="p-1.5 px-0 col-span-1"
                            variant="light"
                            color={isLiked ? "danger" : "default"}
                            startContent={
                                isLiked ? (
                                    <FaHeart className="w-auto h-full aspect-square" />
                                ) : (
                                    <FaRegHeart className="w-auto h-full aspect-square" />
                                )
                            }
                            onClick={handleLikePost}
                        >
                            {post?.likes.length || ""}
                        </Button>
                        <Button
                            size="sm"
                            className="p-1.5 px-0 col-span-1"
                            variant="light"
                            startContent={<FaRegComment className="w-auto h-full aspect-square" />}
                            onClick={onCommentsOpen}
                        >
                            {post?.comments?.length || ""}
                        </Button>
                        <Button
                            isIconOnly
                            size="sm"
                            className="p-1.5 px-0 col-span-1"
                            variant="light"
                            startContent={<FiSend className="w-auto h-full aspect-square" />}
                        />
                        <div className="col-span-3 h-full w-full" />
                        <Button
                            isIconOnly
                            size="sm"
                            className="p-1.5 col-span-1"
                            variant="light"
                            startContent={<FaRegBookmark className="w-auto h-full aspect-square" />}
                        />
                    </div>
                    <div className="py-0">
                        <p className="text-small">
                            <Link
                                to={`/profile/${userProfile?.username}`}
                            >
                                <span className="font-bold me-2">{userProfile?.username}</span>
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
