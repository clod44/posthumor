import { Stack } from '@mantine/core'
import Post from '../components/Post';


const Home = () => {
    return (
        <Stack p={"xs"} gap={"md"}>
            {Array.from({ length: 15 }).map((_, index) => (
                <Post key={index} />
            ))}
        </Stack>
    );
}

export default Home