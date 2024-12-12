import { useEffect, useState } from "react";
import { useAuth, useUser } from "../hooks/useServices";
import { IoMdLogOut } from "react-icons/io";
import { Avatar, Button, Tab, Tabs } from "@nextui-org/react";
import GridGallery from "../components/GridGallery";
import { MdGridOn } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { username } = useParams();
    const { authUser, logout } = useAuth();
    const { userProfile, fetchUserProfile } = useUser();
    const [currentProfile, setCurrentProfile] = useState(null);
    const [currentProfileLoading, setCurrentProfileLoading] = useState(false);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    /*
    authUser - firebase user object
    userProfile - user profile object that holds the logged in user's data
    currentProfile - current profile page's account data
    */

    useEffect(() => {
        if (!currentProfile || !userProfile) return;
        console.log("isOwnProfile", userProfile?.username, currentProfile?.username, userProfile?.username == currentProfile?.username);
        setIsOwnProfile(userProfile?.username == currentProfile?.username);
    }, [currentProfile]);

    useEffect(() => {
        if (currentProfileLoading) return;
        const retrieveUserData = async (_username) => {
            setCurrentProfileLoading(true);
            console.log("retrieving from server", _username);
            try {
                const data = await fetchUserProfile({ username: _username });
                if (data) {
                    setCurrentProfile(data);
                    console.log("user found in server " + data);
                    return;
                }
                console.log("user not found in server " + _username);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setCurrentProfileLoading(false);
            }
        }
        if (!username || username === authUser.username) {
            setCurrentProfileLoading(true);
            setCurrentProfile(userProfile);
            setCurrentProfileLoading(false);
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
    }, [userProfile, username, authUser]);


    return (
        <>
            <div className="w-full min-h-svh flex flex-col justify-start items-center overflow-hidden">
                {(currentProfileLoading) ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <p>Loading...</p>
                    </div>
                ) : (
                    (!currentProfile) ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <p>User not found. try reloading or logging out</p>
                            <Button onClick={logout}>log out</Button>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col sm:w-1/2">
                            <div className="p-5 pb-0">

                                <div className="flex gap-4 h-32 items-center mb-2">
                                    <div className="flex-grow h-full aspect-square">
                                        <Avatar
                                            src={currentProfile.profilePicture}
                                            className="rounded-full aspect-square h-full w-auto"
                                        />
                                    </div>
                                    <div className="flex-grow grid grid-cols-3 gap-2 h-auto w-full">
                                        <div className="col-span-3 overflow-hidden">
                                            <h2 className="font-bold text-xl sm:text-2xl text-center flex-grow">
                                                {currentProfile?.username || "Username"}
                                            </h2>
                                        </div>
                                        <div>
                                            <p className="font-bold sm:text-2xl text-center">{currentProfile?.totalPosts || "0"}</p>
                                            <p className="text-tiny text-foreground-200 text-center"> posts</p>
                                        </div>

                                        <div>
                                            <p className="font-bold sm:text-2xl text-center">{currentProfile?.totalFollowers || "0"}</p>
                                            <p className="text-tiny text-foreground-200 text-center"> followers</p>
                                        </div>

                                        <div>
                                            <p className="font-bold sm:text-2xl text-center">{currentProfile?.totalFollowing || "0"}</p>
                                            <p className="text-tiny text-foreground-200 text-center"> following</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">

                                    <h2 className="font-bold">{currentProfile?.displayName || "Display Name"}</h2>
                                    <p className="text-tiny text-foreground-500">{currentProfile?.bio || "Bio"}.</p>

                                    {!isOwnProfile ? (
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
                                    <GridGallery user={authUser} showOverlay={false} />
                                </Tab>
                                <Tab
                                    key="saved"
                                    title={<FaBookmark className="text-xl" />}
                                >
                                    <GridGallery user={authUser} showOverlay={false} />
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