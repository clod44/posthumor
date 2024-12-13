import { useEffect, useState } from "react";
import { useAuth, useUser } from "../hooks/useServices";
import { IoMdLogOut } from "react-icons/io";
import { Avatar, Button, Tab, Tabs, Spinner } from "@nextui-org/react";
import GridGallery from "../components/GridGallery";
import { MdGridOn } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { username } = useParams();
    const { authUser, loading: authUserLoading, logout } = useAuth();
    const { userProfile, fetchUserProfile } = useUser();
    const [profileData, setProfileData] = useState(null);
    const [profileDataLoading, setProfileDataLoading] = useState(true);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    /*
    - if username is not given or given username is same as logged in user's username
    - - directly use the userProfile data
    - else 
    - - fetch the profile data from the server with given username
    - assign the data to a shared variable: profileData
    - check if profileData is logged in user's data (are they viewing their own profile?)
    */

    /*
    authUser - firebase user object
    userProfile - user profile object that holds the logged in user's data
    profileData - current profile page's account data
    */

    useEffect(() => {
        if (!profileData || !userProfile) return;
        console.log("isOwnProfile", userProfile?.username, profileData?.username, userProfile?.username == profileData?.username);
        setIsOwnProfile(userProfile?.username == profileData?.username);
    }, [profileData]);

    useEffect(() => {
        if (!userProfile || authUserLoading || profileData) return;
        const retrieveUserData = async (_username) => {
            setProfileDataLoading(true);
            try {
                const data = await fetchUserProfile({ username: _username });
                setProfileData(data ?? null);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setProfileData(null);
            } finally {
                setProfileDataLoading(false);
            }
        }
        if (!username || username === authUser.username) {
            setProfileData(userProfile || null);
            setProfileDataLoading(false);
        } else {
            setProfileData(null);
            retrieveUserData(username);
        }
    }, [userProfile, authUserLoading, username]);

    return (
        <>
            <div className="w-full min-h-svh flex flex-col justify-start items-center overflow-hidden">
                {(profileDataLoading) ? (
                    <div className="w-full h-full flex justify-center items-center p-5">
                        <Spinner color="default" />
                    </div>
                ) : (
                    (profileData) ? (
                        <div className="w-full flex flex-col sm:w-1/2">
                            <div className="p-5 pb-0">
                                <div className="flex gap-4 h-32 items-center mb-2">
                                    <div className="flex-grow h-full aspect-square">
                                        <Avatar
                                            src={profileData.profilePicture}
                                            className="rounded-full aspect-square h-full w-auto"
                                        />
                                    </div>
                                    <div className="flex-grow grid grid-cols-3 gap-2 h-auto w-full">
                                        <div className="col-span-3 overflow-hidden">
                                            <h2 className="font-bold text-xl sm:text-2xl text-center flex-grow">
                                                {profileData?.username || "Username"}
                                            </h2>
                                        </div>
                                        <div>
                                            <p className="font-bold sm:text-2xl text-center">{profileData?.totalPosts || "0"}</p>
                                            <p className="text-tiny text-foreground-200 text-center"> posts</p>
                                        </div>

                                        <div>
                                            <p className="font-bold sm:text-2xl text-center">{profileData?.totalFollowers || "0"}</p>
                                            <p className="text-tiny text-foreground-200 text-center"> followers</p>
                                        </div>

                                        <div>
                                            <p className="font-bold sm:text-2xl text-center">{profileData?.totalFollowing || "0"}</p>
                                            <p className="text-tiny text-foreground-200 text-center"> following</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-bold">{profileData?.displayName || "Display Name"}</h2>
                                    <p className="text-tiny text-foreground-500">{profileData?.bio || "Bio"}.</p>
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
                    ) : (
                        <div className="w-full h-full flex justify-center items-center">
                            <p>User not found. try reloading or logging out</p>
                            <Button onClick={logout}>log out</Button>
                        </div>
                    )
                )}
            </div >
        </>
    );
}

export default Profile