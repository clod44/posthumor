
import { SimpleGrid, Image } from '@mantine/core';


const GridGallery = ({
    user = null,
    category = "posts",
}) => {
    return (
        <SimpleGrid cols={3} spacing={5}>
            {Array.from({ length: 12 }).map((_, index) => (
                <Image
                    key={index}
                    className='hover:brightness-110 duration-200 transition-all'
                    src={`https://picsum.photos/300/300?random=${Math.random()}`}
                />
            ))}
        </SimpleGrid>

    );
};

export default GridGallery;
