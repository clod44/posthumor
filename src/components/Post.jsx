import { Group, Image, Text, Avatar, Button, Card, } from '@mantine/core';
import { IoMdMore } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaHeart, FaComment, FaBookmark } from "react-icons/fa";

const Post = () => {
    return (
        <Card shadow="sm" padding="xs" radius="md" withBorder>
            <Group className='h-10 mb-2'>
                <Avatar
                    className="w-auto h-full aspect-square"
                    src="https://thispersondoesnotexist.com/"
                />
                <Text className='flex-grow' size='md'>
                    Joshua Bilboard
                </Text>

                <Button
                    variant='subtle'
                    color='default'
                    size='sm'
                    p={"xs"}
                    className='aspect-square h-full'
                >
                    <IoMdMore className='size-10' />
                </Button>
            </Group>
            <Card.Section>
                <Image
                    className='aspect-4/3 w-full h-auto'
                    src={`https://picsum.photos/500/500?random=${Math.random()}`}
                />
            </Card.Section>
            <Group className='h-10 mb-2' gap="xs">
                <Button
                    variant='subtle'
                    color='red'
                    size='sm'
                    p={"xs"}
                    className='h-full w-auto'
                >
                    <FaHeart className='size-5 me-1' />
                    1.4k
                </Button>
                <Button
                    variant='subtle'
                    color='default'
                    size='sm'
                    p={"xs"}
                    className='h-full w-auto'
                >
                    <FaComment className='size-5 me-1' />
                    427
                </Button>
                <Button
                    variant='subtle'
                    color='default'
                    size='sm'
                    p={"xs"}
                    className='h-full w-auto'
                >
                    <IoSend className='size-5 me-1' />
                    24
                </Button>
                <div className='flex-grow' />
                <Button
                    variant='subtle'
                    color='default'
                    size='sm'
                    p={"xs"}
                    className='aspect-square h-full'
                >
                    <FaBookmark className='size-10' />
                </Button>

            </Group>
            <Text size="sm" lineClamp={2}>
                <span className='font-bold me-1'>joshua69</span> With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
            </Text>
            <Text size='xs' c={'dimmed'} pt={'xs'}>1 hour ago</Text>

        </Card>

    );
}

export default Post