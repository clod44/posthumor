import { Avatar, Button, Image } from "@nextui-org/react";
import { IoMdMore } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";

const Post = () => {
    return (
        <div className="overflow-hidden">
            <div className="flex items-center gap-2 p-2">
                <Avatar
                    size="sm"
                    src={"https://i.pravatar.cc/150?u=" + Math.random()}
                />
                <p className="flex-grow font-bold text-small">Joshua Hernandez</p>
                <Button
                    isIconOnly
                    size="sm"
                    className="p-2"
                    variant="light"
                >
                    <IoMdMore className="w-full h-full" />
                </Button>
            </div>
            <div className="w-full h-full aspect-[4/3] overflow-hidden">

                <Image
                    src={"https://picsum.photos/800/600?random=" + Math.random()}
                    width={"100%"}
                    height={"100%"}
                    radius="none"
                    loading="lazy"
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
                    >
                    </Button>

                    <div className="flex-grow" />

                    <Button
                        isIconOnly
                        size="sm"
                        className="p-2"
                        variant="light"
                        startContent={<FaRegBookmark className="w-auto h-full aspect-square" />}
                    >
                    </Button>
                </div>

                <div className="p-2">
                    <p className="text-small">
                        <span className="font-bold me-2">joshua61</span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aperiam adipisci consequuntur. Omnis reiciendis debitis in velit? Asperiores voluptate architecto quae voluptas debitis saepe expedita!
                    </p>
                    <p className="text-tiny text-foreground-300">1 hour ago</p>
                </div>
            </div>
        </div>

    );
}

export default Post