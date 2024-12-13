import { AdvancedImage, lazyload, responsive, placeholder } from "@cloudinary/react";
import { useState, memo } from "react";
import { cld } from "../context/CloudinaryContext";


const fallbackImage = cld.image("notfound");

const PostImage = memo(({ cloudinaryImage }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [error, setError] = useState(false);

    const handleImageLoaded = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setError(true);
    };

    return (
        <div
            className={`w-full h-full ${imageLoaded ? "" : "animate-pulse aspect-square"}`}
            style={{
                width: "100%",
                overflow: "hidden",
            }}
        >
            <AdvancedImage
                cldImg={error ? fallbackImage : cloudinaryImage}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
                onLoad={handleImageLoaded}
                onError={handleImageError}
                plugins={[
                    lazyload({ rootMargin: "0px 0px 0px 0px", threshold: 0.01 }),
                    responsive({ steps: [800, 1000, 1400] }),
                    placeholder({ mode: "blur" }),
                ]}
            />
        </div>
    );
}, (prevProps, nextProps) => prevProps.cloudinaryImage === nextProps.cloudinaryImage);

export default PostImage;
