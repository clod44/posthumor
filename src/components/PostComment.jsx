import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";


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
        <div className="rounded-xl border border-default shadow p-2 pb-2">
            <Link
                to={`/profile/${userData?.username}`}
                className="grid grid-cols-12 grid-rows-1 items-center"
            >
                <Avatar
                    src={userData?.profilePicture}
                    className="rounded-full aspect-square h-full w-auto col-span-1"
                />
                <span className="col-span-11 w-full h-full px-2 overflow-hidden">{userData?.username || ""}</span>
            </Link>
            <div className="ps-8 my-2">
                <span className="text-foreground-600">{comment?.text}</span>
            </div>
            <div className="flex justify-end">
                <span className="text-foreground-400 text-xs">{comment?.timestamp?.toDate().toLocaleString() || ""}</span>
            </div>
        </div>
    );
};

export default PostComment;