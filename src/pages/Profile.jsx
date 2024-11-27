import { useUser } from "../context/UserContext";
import { IoMdLogOut } from "react-icons/io";
import { Card, Grid, SimpleGrid, Stack, Text, Tabs, Button, Group, Image, Avatar, Center } from '@mantine/core';
import GridGallery from "../components/GridGallery";

const Profile = () => {
    const { user, logout } = useUser();
    console.log(user)
    return (
        <>
            <Card shadow="md" p={"lg"} radius="md" withBorder>
                <Grid mb={"md"} h={200}>
                    <Grid.Col span={{ base: 4, sm: 4, md: 3 }} h={200}>
                        <Avatar
                            className="w-full h-auto"
                            src="https://thispersondoesnotexist.com/"
                        />
                    </Grid.Col>

                    <Grid.Col span={"auto"} h={"100%"}>
                        <Stack>
                            <Grid>
                                <Grid.Col span={"auto"}>
                                    <Text size="xl" weight={500}>
                                        {user?.displayName ?? "No Name"}
                                    </Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 4, sm: 4, md: 3 }}>
                                    <Button
                                        w={"100%"}
                                        h={"100%"}
                                        size="xs"
                                        color="red"
                                        variant="subtle"
                                        onClick={logout}
                                    >
                                        <IoMdLogOut size={20} />
                                    </Button>
                                </Grid.Col>
                            </Grid>
                            <SimpleGrid cols={3}>
                                <Text size="xs" c="dimmed" className="text-nowrap">
                                    128 posts
                                </Text>
                                <Text size="xs" c="dimmed" className="text-nowrap">
                                    1.2k followers
                                </Text>
                                <Text size="xs" c="dimmed" className="text-nowrap">
                                    486 following
                                </Text>
                            </SimpleGrid>


                            <Text size="sm" lineClamp={3}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est maiores sunt harum eveniet ab modi facilis, unde maxime pariatur porro! Quaerat inventore doloremque laborum nihil quasi cum voluptatum illo nulla ex, sapiente dicta est atque qui voluptate. Quaerat perferendis recusandae est reiciendis sed adipisci itaque perspiciatis repellendus rem earum. Dolorum quos reprehenderit odio earum atque facere doloremque veniam deleniti, inventore ex asperiores, eligendi officiis nesciunt hic voluptates repellat perspiciatis qui molestiae quibusdam provident esse autem aliquid. Velit iste facere quisquam excepturi nam accusamus porro neque quia repudiandae! Non, molestiae, excepturi debitis ea enim vero nesciunt, est tempora nobis suscipit dignissimos?
                            </Text>
                        </Stack>
                    </Grid.Col>
                </Grid>

                <Tabs defaultValue="posts" inverted>
                    <Tabs.List justify="center" mb={"xs"}>
                        <Tabs.Tab value="posts">Posts</Tabs.Tab>
                        <Tabs.Tab value="saved">Saved</Tabs.Tab>
                        <Tabs.Tab value="liked">Liked</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="posts" pb="xs">
                        <GridGallery user={user} />
                    </Tabs.Panel>
                    <Tabs.Panel value="saved" pb="xs">Saved</Tabs.Panel>
                    <Tabs.Panel value="liked" pb="xs">Liked</Tabs.Panel>
                </Tabs>
            </Card >
        </>
    );
}

export default Profile