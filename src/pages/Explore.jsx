import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import GridGallery from "../components/GridGallery";

const Explore = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center">

                <div className="w-full sm:w-1/2">
                    <Input
                        className="w-full p-4"
                        placeholder="Search"
                        endContent={<FaSearch className="text-foreground-400" />}
                    />
                    <GridGallery />
                </div>
            </div>
        </>
    );
}

export default Explore;
