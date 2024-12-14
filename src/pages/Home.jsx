import { useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Post from '../components/Post';
import { usePosts } from '../hooks/useServices';
const Home = () => {
    const { getAllPosts } = usePosts();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchPosts = async () => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const posts = await getAllPosts();
            console.log("posts", posts);
            setPosts(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, [])
    const handleRefresh = async () => {
        await fetchPosts();
    };

    return (
        <div className='grid grid-cols-1 items-center p-2 pb-5 gap-5'>

            <PullToRefresh
                onRefresh={handleRefresh}
                refreshingContent={<Spinner color="default" className="w-8 h-8 mt-4 animate-spin" />}
                pullingContent={""}
            >
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </PullToRefresh>
        </div>
    );
}

export default Home