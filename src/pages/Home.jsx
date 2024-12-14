import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { usePosts } from '../hooks/useServices';
const Home = () => {

    const { getAllPosts } = usePosts();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
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
        fetchPosts();
    }, [])

    return (
        <div className='grid grid-cols-1 items-center p-2 py-5 gap-5'>
            {posts.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </div>
    );
}

export default Home