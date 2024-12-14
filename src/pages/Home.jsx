import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { usePosts } from '../hooks/useServices';
import ReactPullToRefresh from 'react-pull-to-refresh';
const Home = () => {
    const { getAllPosts } = usePosts();
    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            const posts = await getAllPosts();
            console.log("posts", posts);
            setPosts(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, [])
    const handleRefresh = () => {
        fetchPosts();
    };

    return (
        <div className='grid grid-cols-1 items-center p-2 py-5 gap-5'>
            <ReactPullToRefresh onRefresh={handleRefresh} className="" style={{ textAlign: 'center' }}>
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </ReactPullToRefresh>
        </div>
    );
}

export default Home