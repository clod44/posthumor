import { Group, Burger, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { PiSmileyMeltingFill } from 'react-icons/pi';

function Header({ opened, toggle }) {
    return (
        <Group h={"100%"} px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text
                component={Link}
                to="/"
                size="xl"
                weight={700}
                className="cursor-pointer inline-flex items-center gap-1"
            >
                <PiSmileyMeltingFill size={20} />
                PostHumor
            </Text>
        </Group>
    );
}

export default Header;
