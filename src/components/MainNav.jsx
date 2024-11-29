import { Link } from 'react-router-dom';
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { IoIosChatboxes } from "react-icons/io";
import { MdOutlineAddBox } from "react-icons/md";
import { FaHome, FaSearch, FaAngleUp, FaBell, FaCog } from 'react-icons/fa';

const routes = [
    { path: "/", icon: <FaHome size={24} />, name: "Home", collapse: false },
    { path: "/explore", icon: <FaSearch size={24} />, name: "Explore", collapse: false },
    { path: "/create", icon: <MdOutlineAddBox size={24} />, name: "Create", collapse: false },
    { path: "/profile", icon: <Avatar src={"https://i.pravatar.cc/150?u=" + Math.random()} size="sm" />, name: "Profile", collapse: false },
    { path: "/notifications", icon: <FaBell size={24} />, name: "Notifications", collapse: true },
    { path: "/messages", icon: <IoIosChatboxes size={24} />, name: "Messages", collapse: true },
    { path: "/settings", icon: <FaCog size={24} />, name: "Settings", collapse: true },
];

function MainNav() {
    return (
        <div className='fixed bottom-0 left-0 w-full h-16 z-[99] bg-background'>
            <div className='flex justify-evenly items-center h-full w-full'>
                {routes.map(({ path, icon, collapse }) => (

                    <Button
                        as={Link}
                        key={path}
                        to={path}
                        isIconOnly
                        variant='light'
                        className={"p-2 flex-grow " +
                            (collapse ? "hidden sm:flex" : "")
                        }
                    >
                        {icon}
                    </Button>
                ))}
                <Dropdown>
                    <DropdownTrigger>

                        <Button
                            isIconOnly
                            className="p-2 flex-grow flex sm:hidden"
                            variant="light"
                        >
                            <FaAngleUp className="w-full h-full" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>

                        {routes.map(({ path, icon, name, collapse }) => (
                            collapse &&
                            <DropdownItem
                                key={path}
                                as={Link}
                                to={path}
                                startContent={icon}
                            >
                                {name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
}

export default MainNav;
