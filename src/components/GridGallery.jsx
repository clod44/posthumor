import { Image, Avatar } from "@nextui-org/react";

const GridGallery = ({
    user = null,
    category = "posts",
    showOverlay = true,
}) => {
    return (
        <div className="grid grid-cols-3 gap-1 p-1">
            {Array.from({ length: 30 }).map((_, index) => (
                <div
                    key={index}
                    className="aspect-square w-full h-full relative"
                >
                    {showOverlay && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-end z-[11] bg-gradient-to-t from-black via-transparent to-transparent">
                            <div className="p-2 w-full h-8 flex items-center gap-2">
                                <Avatar
                                    className="h-full w-auto aspect-square"
                                    src={`https://i.pravatar.cc/150?u=${Math.random()}`}
                                />
                                <span className="font-bold text-tiny sm:text-sm flex-grow">
                                    user{Math.floor(Math.random() * 1000)}
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gray-300 animate-pulse" />
                    <Image
                        className="object-cover aspect-square"
                        src={`https://picsum.photos/300/300?random=${Math.random()}`}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        radius="none"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};

export default GridGallery;
