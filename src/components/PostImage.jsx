// PostImage.js (New file)
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { memo } from 'react';

const PostImage = memo(({ cloudinaryImage }) => (
    <AdvancedImage
        cldImg={cloudinaryImage}
        width="100%"
        height="100%"
        radius="none"
        plugins={[
            lazyload({ rootMargin: '10px 20px 10px 30px', threshold: 0.25 }),
            responsive({ steps: [800, 1000, 1400] }),
            placeholder({ mode: 'blur' })
        ]}
    />
), (prevProps, nextProps) => prevProps.cloudinaryImage === nextProps.cloudinaryImage);

export default PostImage;
