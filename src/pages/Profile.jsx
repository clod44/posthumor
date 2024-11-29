import { useUser } from "../context/UserContext";
import { IoMdLogOut } from "react-icons/io";
import { Image, Button, Tab, Tabs } from "@nextui-org/react";
import GridGallery from "../components/GridGallery";
import { MdGridOn } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";

const Profile = () => {
    const { user, logout } = useUser();
    console.log(user)
    return (
        <>
            <div className="w-full min-h-svh flex flex-col justify-start items-center">
                <div className="w-full flex flex-col sm:w-1/2">
                    <div className="p-5 pb-0">

                        <div className="grid grid-cols-4 mb-4 gap-4">
                            <Image
                                src={"https://i.pravatar.cc/150?u=" + Math.random()}
                                className="rounded-full"
                            />
                            <div className="col-span-3 flex flex-col text-center">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="font-bold text-xl sm:text-4xl flex-grow">@moangusss</h2>
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
                                        <p className="font-bold sm:text-2xl">970</p>
                                        <p className="text-tiny text-foreground-200"> posts</p>
                                    </div>

                                    <div>
                                        <p className="font-bold sm:text-2xl">164K</p>
                                        <p className="text-tiny text-foreground-200"> followers</p>
                                    </div>

                                    <div>
                                        <p className="font-bold sm:text-2xl">1,441</p>
                                        <p className="text-tiny text-foreground-200"> following</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">

                            <h2 className="font-bold">Joshua Hernandez</h2>
                            <p className="text-tiny text-foreground-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit delectus quasi ipsam et rem atque quam ducimus, fuga facere beatae culpa in necessitatibus, cupiditate magni.</p>

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
                    </div>
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
                </div>
            </div >
        </>
    );
}

export default Profile