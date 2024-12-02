import { Avatar, Button } from "@nextui-org/react";
import { IoMdMore } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import {
    AdvancedImage,
    lazyload,
    responsive,
    placeholder
} from '@cloudinary/react';
import { cld } from "../context/CloudinaryContext";  // Import the Cloudinary instance

const Post = ({ post }) => {
    const { getUserData } = useUser();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData(post.userId);
            setUserData(userData);
        };
        fetchUserData();
    }, [post.userId]);

    // post.imageUrl is the public ID
    //fallback id is image not found image id
    const cloudinaryImage = cld.image(post?.imageUrl ?? "vm4pghhxdter1mwctwkf");

    return (
        <div className="overflow-hidden">
            <div className="flex items-center gap-2 p-2">
                <Avatar size="sm" src={userData?.profilePictureUrl} />
                <p className="flex-grow font-bold text-small">{userData?.displayName}</p>
                <Button isIconOnly size="sm" className="p-2" variant="light">
                    <IoMdMore className="w-full h-full" />
                </Button>
            </div>

            <div className="w-full h-full aspect-[4/3] overflow-hidden">
                <AdvancedImage
                    cldImg={cloudinaryImage}
                    width="100%"
                    height="100%"
                    radius="none"
                    plugins={[
                        lazyload({ rootMargin: '10px 20px 10px 30px', threshold: 0.25 }),
                        responsive({ steps: [800, 1000, 1400] }),
                        placeholder({ mode: 'blur' })
                    ]}
                />
            </div>

            <div className="px-2 py-1">
                <div className="flex justify-between items-center">
                    <Button
                        size="sm"
                        className="p-2 px-0"
                        variant="light"
                        startContent={<FaRegHeart className="w-auto h-full aspect-square" />}
                    >
                        1,996
                    </Button>
                    <Button
                        size="sm"
                        className="p-2 px-0"
                        variant="light"
                        startContent={<FaRegComment className="w-auto h-full aspect-square" />}
                    >
                        6
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
                        <span className="font-bold me-2">{userData?.username}</span>
                        {post?.text}
                    </p>
                    <p className="text-tiny text-foreground-300">
                        {post?.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleString() : ""}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Post;
