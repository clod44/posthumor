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
    const [ownProfile, setOwnProfile] = useState(false);


    useEffect(() => {
        if (loading) return;
        const retrieveUserData = async (_username) => {
            console.log("retrieving from server", _username);
            setProfileDataLoading(true);
            try {
                const data = await getUserDataWithUsername(_username);
                if (data) {
                    setProfileData(data);
                    console.log("user found in server " + data);
                    return;
                }
                console.log("user not found in server " + _username);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setProfileDataLoading(false);
            }
        }
        if (!username || username === user.username) {
            setProfileDataLoading(true);
            if (userData) {
                setProfileData(userData);
            }
            setProfileDataLoading(false);
        } else {
            retrieveUserData(username);
        }
        /*
         in case of 
         no userData
         no username
         wrong username
         profileData will be null
         */
    }, [userData, username, loading]);
    useEffect(() => {
        console.log("ownProfile", userData?.username, profileData?.username, userData?.username == profileData?.username);
        setOwnProfile(userData?.username == profileData?.username);
    }, [profileData]);

    return (
        <>
            <div className="w-full min-h-svh flex flex-col justify-start items-center overflow-hidden">
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
                                                {userData?.username || "Username"}
                                            </h2>
                                        </div>
                                        <div className="grid grid-cols-3 px-4">
                                            <div>
                                                <p className="font-bold sm:text-2xl">{userData?.totalPosts || "0"}</p>
                                                <p className="text-tiny text-foreground-200"> posts</p>
                                            </div>

                                            <div>
                                                <p className="font-bold sm:text-2xl">{userData?.totalFollowers || "0"}</p>
                                                <p className="text-tiny text-foreground-200"> followers</p>
                                            </div>

                                            <div>
                                                <p className="font-bold sm:text-2xl">{userData?.totalFollowing || "0"}</p>
                                                <p className="text-tiny text-foreground-200"> following</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">

                                    <h2 className="font-bold">{userData?.displayName || "Display Name"}</h2>
                                    <p className="text-tiny text-foreground-500">{userData?.bio || "Bio"}.</p>

                                    {!ownProfile ? (
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
                                    ) : (
                                        <Button
                                            isIconOnly
                                            color="danger"
                                            className="p-2 ms-auto"
                                            variant="light"
                                            onClick={logout}
                                        >
                                            <IoMdLogOut className="w-full h-full" />
                                        </Button>
                                    )}

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