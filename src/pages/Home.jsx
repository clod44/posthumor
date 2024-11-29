import Post from '../components/Post';

const Home = () => {
    return (
        <div className='flex flex-col items-center p-2 py-5 gap-5'>
            {Array.from({ length: 15 }).map((_, index) => (
                <div className='w-full sm:w-1/2'>
                    <Post key={index} />
                </div>
            ))}
        </div>
    );
}

export default Home