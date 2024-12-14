import { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Post from '../components/Post';
import { usePosts } from '../hooks/useServices';
const Home = () => {
    const { getAllPosts } = usePosts();
    const [posts, setPosts] = useState([]);
    const [initialLoading, setInitialLoading] = useState(false);
    const fetchPosts = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const posts = await getAllPosts();
            console.log("posts", posts);
            setPosts(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]);
        }
    };
    useEffect(() => {
        const initialFetchPosts = async () => {
            setInitialLoading(true);
            await fetchPosts();
            setInitialLoading(false);
        }
        initialFetchPosts();
    }, [])
    const handleRefresh = async () => {
        await fetchPosts();
    };

    return (
        <div className='grid grid-cols-1 items-center p-2 pb-5 gap-5'>
            <PullToRefresh
                isPullable={!initialLoading}
                onRefresh={handleRefresh}
                refreshingContent={<Spinner color="default" className="w-8 h-8 mt-4 animate-spin" />}
                pullingContent={""}
            >
                {initialLoading &&
                    <div className='flex justify-center py-4'>
                        <Spinner color="default" className="w-8 h-8 animate-spin" />
                    </div>}
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </PullToRefresh>
        </div>
    );
}

export default Home