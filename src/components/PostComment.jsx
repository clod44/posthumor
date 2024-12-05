import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";


const PostComment = ({ comment }) => {
    const { getUserData, loading } = useUser();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData(comment.useruid);
            setUserData(userData);
        };
        fetchUserData();
    }, []);

    return (
        <div className="rounded-xl bg-default shadow p-4 pb-2">
            <Button
                as={Link}
                to={`/profile/${userData?.username}`}
                className="w-full"
                variant="light"
                startContent={
                    <Avatar
                        src={userData?.profilePicture}
                        className="rounded-full aspect-square h-full w-auto"
                    />
                }
            >
                <div className="flex-grow overflow-hidden">
                    <span className="font-bold"> {userData?.username || ""}</span>
                </div>
            </Button>
            <div className="ps-4">
                <span className="text-foreground-600">{comment?.text}</span>
            </div>
            <div className="flex justify-end">
                <span className="text-foreground-400 text-xs">{comment?.timestamp?.toDate().toLocaleString() || ""}</span>
            </div>
        </div>
    );
};

export default PostComment;