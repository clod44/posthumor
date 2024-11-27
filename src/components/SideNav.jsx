import { Stack, NavLink, ScrollArea } from '@mantine/core';
import { FaHome, FaSearch, FaCompass, FaComment, FaBell, FaPlus, FaUser, FaCog } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const SideNav = () => {
    const location = useLocation();

    return (
        <Stack className="h-full">
            <ScrollArea className="h-full" scrollbarSize={2}>
                <NavLink
                    component={Link}
                    to="/"
                    label="Home"
                    leftSection={<FaHome size={20} />}
                    variant="subtle"
                    active={location.pathname === '/'}
                />
                <NavLink
                    component={Link}
                    to="/search"
                    label="Search"
                    leftSection={<FaSearch size={20} />}
                    variant="subtle"
                    active={location.pathname === '/search'}
                />
                <NavLink
                    component={Link}
                    to="/explore"
                    label="Explore"
                    leftSection={<FaCompass size={20} />}
                    variant="subtle"
                    active={location.pathname === '/explore'}
                />
                <NavLink
                    component={Link}
                    to="/messages"
                    label="Messages"
                    leftSection={<FaComment size={20} />}
                    variant="subtle"
                    active={location.pathname === '/messages'}
                />
                <NavLink
                    component={Link}
                    to="/notifications"
                    label="Notifications"
                    leftSection={<FaBell size={20} />}
                    variant="subtle"
                    active={location.pathname === '/notifications'}
                />
                <NavLink
                    component={Link}
                    to="/create"
                    label="Create"
                    leftSection={<FaPlus size={20} />}
                    variant="subtle"
                    active={location.pathname === '/create'}
                />
                <NavLink
                    component={Link}
                    to="/profile"
                    label="Profile"
                    leftSection={<FaUser size={20} />}
                    variant="subtle"
                    active={location.pathname === '/profile'}
                />
                <NavLink
                    component={Link}
                    to="/settings"
                    label="Settings"
                    leftSection={<FaCog size={20} />}
                    variant="subtle"
                    active={location.pathname === '/settings'}
                />
            </ScrollArea>
        </Stack>
    );
}

export default SideNav;
