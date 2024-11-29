import { useUser } from "../context/UserContext";
import { IoMdLogOut } from "react-icons/io";
import { Avatar, Button, Tab, Tabs, Spinner } from "@nextui-org/react";
import GridGallery from "../components/GridGallery";
import { MdGridOn } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
    const { username } = useParams();
    const { user, loading, userData, getUserDataWithUsername, logout } = useUser();
    const [profileData, setProfileData] = useState(null);
    const [profileDataLoading, setProfileDataLoading] = useState(true);

    useEffect(() => {
        const retrieveUserData = async (_username) => {
            console.log("retrieving from server", _username);
            setProfileDataLoading(true);
            try {
                const data = await getUserDataWithUsername(_username);
                if (data) {
                    setProfileData(data);
                }
                console.log("user not found " + _username);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setProfileDataLoading(false);
            }
        }
        if (username) {
            retrieveUserData(username);
        } else {
            setProfileDataLoading(true);
            if (userData) {
                setProfileData(userData);
            }
            setProfileDataLoading(false);
        }
        /*
         in case of 
         no userData
         no username
         wrong username
         profileData will be null
         */
    }, [userData, username, loading]);

    return (
        <>
            <div className="w-full min-h-svh flex flex-col justify-start items-center">
                {(loading || profileDataLoading) ? (
                    <div className="w-full min-h-svh flex justify-center items-center">
                        <Spinner size="lg" color="default" />
                    </div>
                ) : (
                    (!profileData) ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <p>User not found</p>
                            <Button onClick={logout}>Try To log out</Button>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col sm:w-1/2">
                            <div className="p-5 pb-0">

                                <div className="grid grid-cols-4 mb-4 gap-4">
                                    <Avatar
                                        src={profileData.profilePicture}
                                        className="rounded-full aspect-square h-full w-auto"
                                    />
                                    <div className="col-span-3 flex flex-col text-center">
                                        <div className="flex justify-between items-center mb-2">
                                            <h2 className="font-bold text-xl sm:text-2xl  flex-grow">
                                                {user.username || "Username"}
                                            </h2>
                                            <Button
                                                isIconOnly
                                                color="danger"
                                                className="p-2"
                                                variant="light"
                                                onClick={logout}
                                            >
                                                <IoMdLogOut className="w-full h-full" />
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-3 px-4">
                                            <div>
                                                <p className="font-bold sm:text-2xl">{user.totalPosts || "0"}</p>
                                                <p className="text-tiny text-foreground-200"> posts</p>
                                            </div>

                                            <div>
                                                <p className="font-bold sm:text-2xl">{user.totalFollowers || "0"}</p>
                                                <p className="text-tiny text-foreground-200"> followers</p>
                                            </div>

                                            <div>
                                                <p className="font-bold sm:text-2xl">{user.totalFollowing || "0"}</p>
                                                <p className="text-tiny text-foreground-200"> following</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">

                                    <h2 className="font-bold">{user.displayName || "Display Name"}</h2>
                                    <p className="text-tiny text-foreground-500">{user.bio || "Bio"}.</p>

                                    <div className="grid grid-cols-2 mt-2 gap-2">
                                        <Button
                                            size="sm"
                                            className="font-bold"
                                        >
                                            Follow
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="font-bold"
                                        >
                                            Message
                                        </Button>
                                    </div>

                                </div>
                            </div >
                            <Tabs
                                fullWidth
                                variant="underlined"
                            >

                                <Tab
                                    key="posts"
                                    title={<MdGridOn className="text-xl" />}
                                >
                                    <GridGallery user={user} showOverlay={false} />
                                </Tab>
                                <Tab
                                    key="saved"
                                    title={<FaBookmark className="text-xl" />}
                                >
                                    <GridGallery user={user} showOverlay={false} />
                                </Tab>
                            </Tabs>
                        </div >
                    )
                )}
            </div >
        </>
    );
}

export default Profile