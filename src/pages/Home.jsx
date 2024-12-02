import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { usePost } from '../context/PostContext';
const Home = () => {

    const { getAllPosts } = usePost();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getAllPosts();
            console.log("posts", posts);
            setPosts(posts);
        };
        fetchPosts();
    }, [])

    return (
        <div className='flex flex-col items-center p-2 py-5 gap-5'>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}

export default Home