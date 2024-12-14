import { useUser } from "../hooks/useServices";
import { useState, useEffect } from "react";
import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";


const PostComment = ({ comment }) => {
    const { fetchUserProfile, loading } = useUser();
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userProfile = await fetchUserProfile({ uid: comment.useruid });
                setUserProfile(userProfile);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchUserData();
        console.log(comment)
    }, []);

    return (
        <div className="rounded-xl border border-default shadow p-2 pb-2">
            <Link
                to={`/profile/${userProfile?.username}`}
                className="grid grid-cols-12 grid-rows-1 items-center"
            >
                <Avatar
                    src={userProfile?.profilePicture}
                    className="rounded-full aspect-square h-full w-auto col-span-1"
                />
                <span className="col-span-11 w-full h-full px-2 overflow-hidden">{userProfile?.username || ""}</span>
            </Link>
            <div className="ps-8 my-2">
                <span className="text-foreground-600">{comment?.text}</span>
            </div>
            <div className="flex justify-end">
                <span className="text-foreground-400 text-xs">
                    {comment?.timestamp instanceof Timestamp
                        ? comment.timestamp.toDate().toLocaleString()
                        : ""}
                </span>
            </div>
        </div >
    );
};

export default PostComment;