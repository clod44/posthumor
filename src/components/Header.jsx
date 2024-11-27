import { Group, Burger, NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';
import { PiSmileyMeltingFill } from 'react-icons/pi';

function Header({ opened, toggle }) {
    return (
        <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <NavLink
                component={Link}
                to="/"
                label="PostHumor"
                leftSection={<PiSmileyMeltingFill size={20} />}
            />
        </Group>
    );
}

export default Header;
